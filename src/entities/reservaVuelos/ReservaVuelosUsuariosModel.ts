
import { Document, model, Schema } from "mongoose";

interface ReservaVuelosUsuarios extends Document {
    idUsuario: Schema.Types.ObjectId;
    nameUsuario: string;
    nameApellido: string;
    emailUsuario: string;
    idVuelo: Schema.Types.ObjectId;
    nameVuelo: string;
    aerolineaVuelo: string;
    origenVuelo: string;
    destinoVuelo: string;
    fechaVuelo: string;
    horaVuelo: string;
    cantidadAsiento: number;
    precioPagar: number;
    superAdminReservaId: Schema.Types.ObjectId;
}

const ReservaVuelosUsuariosSchema = new Schema<ReservaVuelosUsuarios>(
    {
        nameUsuario: String,
        nameApellido: String,
        emailUsuario: String,
        nameVuelo: String,
        aerolineaVuelo: String,
        origenVuelo: String,
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

        precioPagar: {
            type: Number,
            required: true,
        },

        superAdminReservaId: {
            type: Schema.Types.ObjectId,
            ref: "ReservaVueloSuperAdmin"
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservaVuelosUsuariosModel = model<ReservaVuelosUsuarios>("ReservaVuelosUsuarios", ReservaVuelosUsuariosSchema);
export default ReservaVuelosUsuariosModel;