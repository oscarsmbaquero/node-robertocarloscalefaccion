import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientesSchema = new Schema(

  //forzar commit 
  {
    cliente: { type: String, required: true },
    localidad: { type: String, required: true },
    direccion: { type: String, required: true },
    caldera: { type: String, required: true },
    telefono: {type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Clientes = mongoose.model('Clientes',clientesSchema );

export { Clientes }