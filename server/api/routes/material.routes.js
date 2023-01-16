import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { getMaterial, addMaterial, deleteMaterial, traspasoMaterial, repararMaterial, getPrice } from '../controllers/material.controller.js';

 const materialRoutes = express.Router();

 materialRoutes.get('/', getMaterial);
 materialRoutes.post('/', addMaterial);
 materialRoutes.delete("/:id", deleteMaterial);
 materialRoutes.put('/traspaso/', traspasoMaterial);
 materialRoutes.put('/reparar/:id', repararMaterial);
 materialRoutes.get('/consultarPrecio/:id', getPrice);
 //userRoutes.put('/edit', [isAuth, upload.single('image'), uploadToCloudinary], editUser);
 



export { materialRoutes };