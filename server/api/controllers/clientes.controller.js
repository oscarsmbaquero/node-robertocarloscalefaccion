import { Clientes } from "../models/Clientes.Model.js";


const addClient = async (req, res, next) => {
 

  try {    
     const query = { cliente: req.body.cliente };
      console.log(query,123)
      const options = {     
      projection: { cliente: 1, telefono: 1},
    };
     const customer = await Clientes.findOne(query);
    if (customer){
      console.log('Existe')
    }else{
      const NewCliente = new Clientes({
        cliente: req.body.cliente,
        direccion: req.body.direccion,
        localidad: req.body.localidad,
        caldera: req.body.caldera,
        telefono: req.body.telefono,
      });
      const newClienteDB = await NewCliente.save();
      return res.json({
        status: 201,
        message: httpStatusCode[201],
        data: { cliente: NewCliente },
      });
    }
  } catch (error) {
    return next(error);
  }

  
  
};


const getClientes = async (req, res, next) => {
  // console.log('Entro');
  try {
    const clientes = await Clientes.find()
     
    return res.status(200).json(clientes);
    res.send(clientes);
  } catch (error) {
    return next(error);
  }
};

export { getClientes,addClient };