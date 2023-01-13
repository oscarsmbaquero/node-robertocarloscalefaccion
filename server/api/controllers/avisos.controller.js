import { Avisos } from "../models/Avisos.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Material } from "../models/Material.Model.js";
import { User } from "../models/User.Model.js";
import { Clientes } from "../models/Clientes.Model.js";


const getAvisos = async (req, res, next) => {
  // console.log('Entro');
  try {
    const avisos = await Avisos.find()
      // .populate({ path: "tecnicoIntervencion",select: "name"})
      .populate({ path: "materialIntervencion",select: "descripcion"})
      // .populate({ path: "user_assigned", select: "name" });
    //  .populate(({path:'material_consumido', select :'descripcion'}));
    //console.log(avisos);
    return res.status(200).json(avisos);
    //console.log(avisos);
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

  //console.log(req.body)
  try {
    const NewAviso = new Avisos({
      cliente: req.body.cliente,
      direccion: req.body.direccion,
      localidad: req.body.localidad,
      caldera: req.body.caldera,
      telefono: req.body.telefono,
      averia: req.body.averia,
      prioridad: req.body.prioridad,
      estado: req.body.estado,
      //image: req.body.image,
    });
    const newAvisoDB = await NewAviso.save();
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
    console.log(avisoId);
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
    console.log(req.body, 87);
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

const getAvisoById = async (req, res, next) => {
  try {
    console.log("Entro");
    const { id } = req.params;
    console.log(id);
    const avisoById = await Avisos.findById(id);
    return res.status(200).json(avisoById);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: jobbyid },
    // });
    //res.send(jobbyid);
  } catch (error) {
    return next(error);
  }
};

const AddIntervencion = async (req, res, next) => {

  console.log(req.body.materialIntervencion,89745)
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
    } = req.body;

    const avisoUpdated = await Avisos.findByIdAndUpdate(id, { estado: estado });
    //añadimos los campos de intervención
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
  } catch (error) {}
};

const ShowIntervencion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avisoById = await Avisos.findById(id)
      .populate({ path: "materialIntervencion", select: "descripcion" });

    //.populate(({path:'materialIntervencion', select :'descripcion'}));

    //.populate({path:'materialIntervencion', select :'estado'})
    return res.status(200).json(avisoById);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: jobbyid },
    // });
    //res.send(jobbyid);
  } catch (error) {
    return next(error);
  }
};

export {
  getAvisos,
  createAvisos,
  deleteAviso,
  editAviso,
  getAvisoById,
  AddIntervencion,
  ShowIntervencion,
};
