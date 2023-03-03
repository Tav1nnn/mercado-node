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
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Erro: 'Erro ao validar o schema' });
    }

    const { name, email, senha } = req.body;

    const prisma = new PrismaClient();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        senha,
      },
    });

    return res.status(200).json(user);
  }
}

export default new UserController();
