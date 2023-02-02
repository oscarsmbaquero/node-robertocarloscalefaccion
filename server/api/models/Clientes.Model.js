import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientesSchema = new Schema(

  //forzar commit 
  {
    name: { type: String, required: true },
    tipoCliente: { type: String, required: true },
    dni: {type: String, required: true },
    telefono: {type: String, required: true },
    email: {type: String, required: true },
    direccion: { type: String, required: true },
    localidad: { type: String, required: true },
    //avisosImpagados:[{type: mongoose.Types.ObjectId, ref:'Avisos', required:false}]
  },
  {
    timestamps: true,
  }
);

const Clientes = mongoose.model('Clientes',clientesSchema );

export { Clientes }