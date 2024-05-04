
import { Document, model, Schema } from "mongoose";


interface ReservaVuelos extends Document {
    idUsuario: Schema.Types.ObjectId;
    nameUsuario: string;
    idVuelo: Schema.Types.ObjectId;
    nameVuelo: string;
    fechaVuelo: string;
    horaVuelo: string;
    pago: number,
}

const ReservaVuelosSchema = new Schema<ReservaVuelos>(
    {
        
    
        idUsuario:
        {
            type: Schema.Types.ObjectId,
            ref: "UsuarioModel"
        },

        nameUsuario: {
            type: String,
            required: false,
        },

        idVuelo:
        {
            type: Schema.Types.ObjectId,
            ref: "VueloModel"
        },

        nameVuelo:  {
            type: String,
            required: false,
        },

        fechaVuelo: {
            type: String,
            required: false,
        },

        horaVuelo: {
            type: String,
            required: false,
        }, 

        pago: {
            type: Number,
            required: true,
        }, 

    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservaVuelosModel = model<ReservaVuelos>("ReservaVuelos", ReservaVuelosSchema);
export default ReservaVuelosModel;