import { PrismaClient } from '@prisma/client';
import * as Yup from 'yup';

class CadastroProduto {
  async cadastroProduto(req, res) {
    const { user } = req;
    console.log(user);
    if (user.isAdm === false) {
      return res.status(401).json({ Erro: 'Este usuario não tem permição' });
    }

    const schema = Yup.object().shape({
      codigo: Yup.number().required(),
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
      quantidade: Yup.number().required(),
      preco: Yup.number.required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ Erro: 'Erro ao validar o shema' });
    }

    const {
      codigo, nome, descricao, quantidade, preco,
    } = req.body;

    const prisma = new PrismaClient();

    const result = await prisma.produto.findUnique({
      where: {
        codigo,
      },
    });

    if (result === null) {
      const produto = await prisma.produto.create({
        data: {
          codigo, nome, descricao, quantidade, preco,
        },
      });

      return res.status(200).json(produto);
    }
    return res.status(200).json({ erro: 'codigo já cadastrado' });
  }
}

export default new CadastroProduto();
