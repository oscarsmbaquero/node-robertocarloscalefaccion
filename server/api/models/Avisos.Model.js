import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const avisosSchema = new Schema(

  {
    //name:{ type: String, required:true},
    //cliente: { type: String, required: true },
    averia: { type: String, required: true },
    prioridad: { type: String, required: true },
    estado: { type: String, required: true },
    motivo: { type: String, required: false },
    totalHoras: [{ type: Number, required: false }],
    intervencion: [{ type: String, required:true}],
    cobrado: { type: String, required: false },
    fecha_inicio: [{ type: String, required:true}],
    fecha_fin: [{type: String, required:true}],
    km: [{type: Number, required:true}],
    viaje: [{type: Number, required:true}],
    importeReparacion: {type: Number, required:false},
    cliente: {type: mongoose.Types.ObjectId, ref:'Clientes', required:false},
    materialIntervencion: [{type: mongoose.Types.ObjectId, ref:'Material', required:false}],
  },
  {
    timestamps: true,
  }
);

const Avisos = mongoose.model('Avisos',avisosSchema );

export { Avisos }