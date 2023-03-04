import { Router } from 'express';
import userCadastro from '../controllers/userController/ControllerCadastro';
import userLogin from '../controllers/userController/ControllerLogin';

const routes = new Router();

routes.post('/cadastro', userCadastro.cadastro);
routes.post('/login', userLogin.login);

export default routes;
