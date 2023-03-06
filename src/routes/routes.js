import { Router } from 'express';
import userCadastro from '../controllers/userController/ControllerCadastro';
import userLogin from '../controllers/userController/ControllerLogin';
import sessoesControlers from '../controllers/sessoesController/SessoesController';

const routes = new Router();

routes.post('/sessao', sessoesControlers.create);

routes.post('/cadastro', userCadastro.cadastro);
routes.post('/login', userLogin.login);

export default routes;
