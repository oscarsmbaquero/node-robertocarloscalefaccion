import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const avisosSchema = new Schema(

  //forzar commit 
  {
    cliente: { type: String, required: true },
    localidad: { type: String, required: true },
    direccion: { type: String, required: true },
    caldera: { type: String, required: true },
    averia: { type: String, required: true },
    prioridad: { type: String, required: true },
    estado: { type: String, required: true },
    telefono: {type: String, required: true },
    motivo: { type: String, required: false },
    totalHoras: [{ type: Number, required: false }],
    intervencion: [{ type: String, required:true}],
    fecha_inicio: [{ type: String, required:true}],
    fecha_fin: [{type: String, required:true}],
    km: [{type: Number, required:true}],
    viaje: [{type: Number, required:true}],
    importeReparacion: {type: Number, required:false},
    materialIntervencion: [{type: mongoose.Types.ObjectId, ref:'Material', required:false}],
  },
  {
    timestamps: true,
  }
);

const Avisos = mongoose.model('Avisos',avisosSchema );

export { Avisos }