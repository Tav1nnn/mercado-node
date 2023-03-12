import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';

class CadastroProduto {
  async cadastroProduto(req, res) {
    const { user } = req;

    if (user.isAdm === false) {
      return res.status(401).json({ Erro: 'Este usuario não tem permição' });
    }

    const schema = Yup.object().shape({
      codigo: Yup.number().required(),
      name: Yup.string().required(),
      descricao: Yup.string().required(),
      quantidade: Yup.number().required(),
      preco: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ Erro: 'Erro ao validar o shema' });
    }

    const {
      codigo, name, descricao, quantidade, preco,
    } = req.body;

    console.log(codigo);

    const prisma = new PrismaClient();

    const result = await prisma.produto.findUnique({
      where: {
        codigo,
      },
    });

    if (result === null) {
      const produto = await prisma.produto.create({
        data: {
          codigo, name, descricao, quantidade, preco,
        },
      });

      return res.status(200).json(produto);
    }
    return res.status(200).json({ erro: 'codigo já cadastrado' });
  }
}

export default new CadastroProduto();
