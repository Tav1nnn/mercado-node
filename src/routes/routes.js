import { Router } from 'express';
import user from '../controllers/userController/cadastro';

const routes = new Router();

routes.post('/cadastro', user.cadastro);

export default routes;
