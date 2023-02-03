import { Clientes } from "../models/Clientes.Model.js";


const addClient = async (req, res, next) => {
 

  try {        
      const NewCliente = new Clientes({
        nombre: req.body.nombre,
        tipoCliente: req.body.tipoCliente,
        dni: req.body.dni,
        telefono: req.body.telefono,
        email: req.body.email,
        caldera: req.body.caldera,
        direccion: req.body.direccion ,
        localidad: req.body.localidad,
      });
      const newClienteDB = await NewCliente.save();
      return res.json({
        status: 201,
        //message: httpStatusCode[201],
        data: { cliente: NewCliente },
      });
    
  } catch (error) {
    return next(error);
  }  
};

const getClientes = async (req, res, next) => {
  // console.log('Entro');
  try {
    const clientes = await Clientes.find()
    .populate([{ path: "avisos", select: "cobrado" }]);
    return res.status(200).json(clientes);
    res.send(clientes);
  } catch (error) {
    return next(error);
  }
}
  const getClienteById = async (req, res, next) => {
    console.log('Entro')
    try {
      const { id } = req.params;
      const clientes = await Clientes.findById(id)
      .populate([{ path: "avisos", select: "" }]);
       //console.log(clientes)
      return res.status(200).json(clientes);
      res.send(clientes);
    } catch (error) {
      return next(error);
    }
};




export { getClientes,addClient, getClienteById };
