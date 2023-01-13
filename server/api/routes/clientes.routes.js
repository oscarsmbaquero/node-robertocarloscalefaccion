import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {isAuth} from '../../authentication/jwt.js';

import {  getClientes, addClient } from '../controllers/clientes.controller.js';

 const clientesRoutes = express.Router();

 clientesRoutes.post('/', addClient);
 clientesRoutes.get('/', getClientes);
  
  
//  userRoutes.post('/login/',loginUser);



export { clientesRoutes };