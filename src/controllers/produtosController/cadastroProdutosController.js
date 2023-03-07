import { PrismaClient } from '@prisma/client';

class CadastroProduto {
  async cadastroProduto(req, res) {
    const { user } = req;

    return res.json(user.id);
  }
}

export default new CadastroProduto();
