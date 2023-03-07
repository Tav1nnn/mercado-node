import { Router } from 'express';
import midleware from '../middleware/midleware';
import userCadastro from '../controllers/userController/ControllerCadastro';
import userLogin from '../controllers/userController/ControllerLogin';
import produtoCadastro from '../controllers/produtosController/cadastroProdutosController';

const routes = new Router();

routes.post('/login', userLogin.login);
routes.post('/cadastro', userCadastro.cadastro);

routes.use(midleware);

routes.post('/cadastroProduto', produtoCadastro.cadastroProduto);

export default routes;
