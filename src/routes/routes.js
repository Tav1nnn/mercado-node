import { Router } from 'express';
import user from '../controllers/userController';

const routes = new Router();

routes.post('/cadastro', user.cadastro);

export default routes;
