//import { User } from "../models/User.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Material } from "../models/Material.Model.js";

const getMaterial = async (req,res,next) => {

    try {
        const material = await Material.find()
        //.populate(({path:'almacen', select :'name'}));
        return res.status(200).json(material);
    } catch (error) {
        return next(error)        
    }
  };

  const addMaterial = async ( req, res, next) => {
    try {
        const NewMaterial = new Material({
          descripcion : req.body.descripcion,
          estado : req.body.estado,
          unidades : req.body.unidades,
          tipo : req.body.tipo,
          almacen : req.body.almacen,
          incidencia : req.body.incidencia,
          ubicacion : req.body.ubicacion,
          pcompra : req.body.pcompra,
          iva : req.body.iva,
          pvp : req.body.pvp,
          //image : req.body.image,
         
        })
        const newMaterialDB = await NewMaterial.save();
        return res.json({
            status: 201,
            message: httpStatusCode[201],
            data: { material: newMaterialDB },
          });
    } catch (error) {
      return next(error); 
    }
};

const deleteMaterial = async (req, res, next) => {
  
    try {
      const { id } = req.params;
     
      const materialDelete = await Material.findByIdAndDelete(id);

      
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { material: materialDelete },
      });
    } catch (error) {
      return next(error);
    }
};

const traspasoMaterial = ('/', async (req, res, next) => {  
  try { 
    const { id, almacen } = req.body;
    const estadoModify = await Material.findByIdAndUpdate(
      id,
       {ubicacion:almacen}
    );
    return res.status(200).json(estadoModify);
} catch (error) {
    return next(error);
}
})
const repararMaterial = ('/', async (req, res, next) => {  
  
  const { id, } = req.params;  
  try {
    const estadoModify = await Material.findByIdAndUpdate(
      id,
      {estado:'Operativo'}//id del almacen
    );
    return res.status(200).json(estadoModify);
} catch (error) {
    return next(error);
}
})


export { getMaterial, addMaterial, deleteMaterial, traspasoMaterial, repararMaterial };
//getMaterialByUser, addMaterial