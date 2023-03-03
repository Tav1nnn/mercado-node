import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async cadastro(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string(),
      confirmSenha: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Erro: 'Erro ao validar o schema' });
    }

    const {
      name, email, senha, confirmSenha,
    } = req.body;

    if (senha !== confirmSenha) {
      return res.status(400).json({ Erro: 'As senhas não são iguais' });
    }

    const prisma = new PrismaClient();

    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (result === null) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          senha,
        },
      });

      return res.status(200).json(user);
    }

    return res.status(400).json({ Erro: 'Email já cadastrado' });
  }
}

export default new UserController();
