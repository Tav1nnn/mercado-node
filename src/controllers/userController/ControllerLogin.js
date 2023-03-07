import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

class ControllerLogin {
  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    console.log(req.body);
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
      return res.status(400).json({ Erro: 'Email ou senha incorretos' });
    }

    const { id, name, isAdm } = user;

    return res.status(200).json({
      user: {
        id,
        name,
        email,
        isAdm,
      },
      token: jwt.sign({
        id, name, email, isAdm,
      }, 'secret', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new ControllerLogin();
