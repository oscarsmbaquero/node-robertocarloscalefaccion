import { Avisos } from "../models/Avisos.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Material } from "../models/Material.Model.js";
import { User } from "../models/User.Model.js";
import { Clientes } from "../models/Clientes.Model.js";


const getAvisos = async (req, res, next) => {
 
  try {
    const avisos = await Avisos.find()
      .populate({ path: "materialIntervencion",select: "descripcion"})
      .populate({path:'cliente', select :""})
     console.log(avisos.cliente,14) 
    return res.status(200).json(avisos);
    // return res.json({
    //   //  status : 200,
    //   //  message : httpStatusCode[200],
    //   data: { avisos: avisos },
    // });
    res.send(avisos);
  } catch (error) {
    return next(error);
  }
};

const avisosDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avisos = await Avisos.findById(id)
      .populate({ path: "materialIntervencion",select: "descripcion"})
      .populate({path:'cliente', select :''})
    return res.status(200).json(avisos);
 
    return res.json({
      //  status : 200,
      //  message : httpStatusCode[200],
      data: { avisos: avisos },
    });
    res.send(avisos);
  } catch (error) {
    return next(error);
  }
};


const createAvisos = async (req, res, next) => {
  try {
    const NewAviso = new Avisos({
      averia: req.body.averia,
      prioridad: req.body.prioridad,
      estado: req.body.estado,
      cobrado: req.body.cobrado,
      cliente: req.body.cliente,
    });
    const newAvisoDB = await NewAviso.save();
    //const idCliente = newAvisoDB._id;
    await Clientes.updateOne(
      { _id: newAvisoDB.cliente },
      { $push: { avisos: newAvisoDB._id } },
      { new: true }
    );
    await Clientes.updateOne(
      { _id: newAvisoDB.cliente },
      { $push: { averia: averia } },
      { new: true }
    );


    return res.json({
      status: 201,
      message: httpStatusCode[201],
      data: { aviso: newAvisoDB },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteAviso = async (req, res, next) => {
  try {
    const { avisoId } = req.params;
   
    const avisoDelete = await Avisos.findByIdAndDelete(avisoId);

    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { aviso: avisoDelete },
    });
  } catch (error) {
    return next(error);
  }
};

const editAviso = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const avisoModify = new Avisos(req.body);
    //Para evitar que se modifique el id de mongo:
    avisoModify._id = id;
    const avisoUpdated = await Avisos.findByIdAndUpdate(id, avisoModify);
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { aviso: avisoUpdated },
    });
  } catch (error) {
    return next(error);
  }
};

const collectRepair = async (req, res, next) => {
  try {
    
    const { id } = req.params;
   
    const facturaCobrada = await Avisos.findByIdAndUpdate(
      id,
      { cobrado: "Cobrado" }
    );
    
  } catch (error) {
    return next(error);
  }
};

const AddIntervencion = async (req, res, next) => {

  try {
    const { id } = req.params;
    const {
      estado,
      fecha_fin,
      fecha_inicio,
      intervencion,
      km,
      materialIntervencion,
      viaje,
      //material,
      motivo,
      importeReparacion,
      totalHoras,
      clienteInte,
    } = req.body;
    const avisoUpdated = await Avisos.findByIdAndUpdate(id, { estado: estado });
    //a??adimos los campos de intervenci??n
    await Avisos.updateOne({ _id: id }, { $push: { km: km } }, { new: true });
    await Avisos.updateOne(
      { _id: id },
      { $push: { intervencion: intervencion } },
      { new: true }
    );
    await Avisos.updateOne(
      { _id: id },
      { $push: { fecha_fin: fecha_fin } },
      { new: true }
    );
    await Avisos.updateOne(
      { _id: id },
      { $push: { fecha_inicio: fecha_inicio } },
      { new: true }
    );
    await Avisos.updateOne(
      { _id: id },
      { $push: { viaje: viaje } },
      { new: true }
    );
    const estadoUpdated = await Avisos.findByIdAndUpdate(id, {
      motivo: motivo,
    });
    await Avisos.updateOne(
      { _id: id },
      { $push: { totalHoras: totalHoras } },
      { new: true }
    );
    const materialUpdated = await Material.findByIdAndUpdate(
      materialIntervencion,
      { estado: "Averiado" }
    );
    await Avisos.updateOne(
      { _id: id },
      { $push: { materialIntervencion: materialIntervencion } },
      { new: true }
    );
    const precioUpdated = await Avisos.findByIdAndUpdate(id, {
      importeReparacion: importeReparacion,
    });
    // await Clientes.updateOne(
    //   { _id: clienteInte },
    //   { $push: { avisos: id } },
    //   { new: true }
    // );
    return res.status(200).json();
  } catch (error) {}
};
const ShowIntervencion = async (req, res, next) => {
  console.log('Entro')
  try {
    const { id } = req.params;
    const avisoById = await Avisos.findById(id)
      .populate({ path: "materialIntervencion", select: "descripcion" });
      
    return res.status(200).json(avisoById);
  
  } catch (error) {
    return next(error);
  }
};

const getClienteHistory = async (req, res, next) => {
  //console.log('Entro')
  try {
    const { id } = req.params;
    const clientes = await Avisos.find({cliente:id})
    .populate([{ path: "materialIntervencion", select: "descripcion" }]);
     //console.log(clientes)
    return res.status(200).json(clientes);
    res.send(clientes);
  } catch (error) {
    return next(error);
  }
};

export {
  getAvisos,
  avisosDetail,
  createAvisos,
  deleteAviso,
  editAviso,
  collectRepair,
  AddIntervencion,
  ShowIntervencion,
  getClienteHistory
};
