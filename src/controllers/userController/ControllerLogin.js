import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

class ControllerLogin {
  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Erro: 'Erro ao validar schema' });
    }

    const { email, senha } = req.body;

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        email,
        senha,
      },
    });

    if (user === null) {
      return res.status(400).json({ Erro: 'Usuário não existe' });
    }

    return res.status(200).json(user);
  }
}

export default new ControllerLogin();
