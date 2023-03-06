/* eslint-disable class-methods-use-this */
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

class SessoesController {
  async create(req, res) {
    const prisma = new PrismaClient();

    const { email, senha } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
        senha,
      },
    });

    if (!user) {
      return res.status(401).json({ Erro: 'Usuário não tem permissão para acessar essa api' });
    }

    const { id, name } = user;
    return res.status(200).json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, 'secret', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessoesController();
