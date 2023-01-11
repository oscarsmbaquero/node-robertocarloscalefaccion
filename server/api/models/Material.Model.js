import mongoose from "mongoose";
const Schema = mongoose.Schema;

const materialSchema = new Schema(
    {
     descripcion: { type:String, required:true },
     estado: { type:String, required:false },
     incidencia: { type:String, required:false },
     pcompra:{type:Number, required:true},
     iva:{type:Number, required:true},
     pvp:{type:Number, required:true},
     unidades: { type:Number, required:true }, 
     tipo: { type:String, required: true }, 
     //name_almacen: { type: mongoose.Types.ObjectId, ref: 'User' , required: false },
    },
    {
        timestamps:true,
    }
    );

    const Material = mongoose.model('Material', materialSchema);

    export { Material }