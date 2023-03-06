export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === 'secret') {
    return next();
  }

  return res.status(401).json({ erro: 'Usuário não autorizado para acessar essa API' });
};
