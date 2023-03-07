import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ Erro: 'Não possui o token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, 'secret');

    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ Erro: 'token inválido' });
  }
};
