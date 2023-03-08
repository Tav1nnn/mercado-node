import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import midleware from '../middleware/midleware';
import userCadastro from '../controllers/userController/ControllerCadastro';
import userLogin from '../controllers/userController/ControllerLogin';
import produtoCadastro from '../controllers/produtosController/cadastroProdutosController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/login', userLogin.login);
routes.post('/cadastro', userCadastro.cadastro);

routes.use(midleware);

routes.post('/cadastroProduto', produtoCadastro.cadastroProduto);
routes.post('/file', upload.single('file'), (req, res) => res.json({ response: 'ok' }));

export default routes;
