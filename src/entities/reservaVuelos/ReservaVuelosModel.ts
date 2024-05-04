
import { Document, model, Schema } from "mongoose";


interface ReservaVuelos extends Document {
    idUsuario: Schema.Types.ObjectId;
    nameUsuario: string;
    idVuelo: Schema.Types.ObjectId;
    nameVuelo: string;
    fecha: string;
    hora: string;
    estado: string,
}

const ReservaVuelosSchema = new Schema<ReservaVuelos>(
    {
        nameUsuario: String,
        nameVuelo: String,
        fecha: String,
        hora: String,
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

        estado: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservaVuelosModel = model<ReservaVuelos>("ReservaVuelos", ReservaVuelosSchema);
export default ReservaVuelosModel;