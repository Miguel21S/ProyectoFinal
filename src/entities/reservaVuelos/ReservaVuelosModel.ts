
import { Document, model, Schema } from "mongoose";

interface ReservaVuelos extends Document {
    idUsuario: Schema.Types.ObjectId;
    nameUsuario: string;
    emailUsuario: string
    idVuelo: Schema.Types.ObjectId;
    nameVuelo: string;
    origeVuelo: string;
    destinoVuelo: string;
    fechaVuelo: string;
    horaVuelo: string;
    cantidadAsiento: number,
    pago: number,
}

const ReservaVuelosSchema = new Schema<ReservaVuelos>(
    {
        nameUsuario: String,
        emailUsuario: String,
        nameVuelo: String,
        origeVuelo: String,
        destinoVuelo: String,
        fechaVuelo: String,
        horaVuelo: String, 
        
        idUsuario:
        {
            type: Schema.Types.ObjectId,
            ref: "UsuarioModel"
        },

        idVuelo:
        {
            type: Schema.Types.ObjectId,
            ref: "VueloModel"
        },

        cantidadAsiento: {
            type: Number,
            required: true,
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