import { Document, model, Schema } from "mongoose";


interface ReservaAlojamientoSuperAdmin extends Document {
    idAlojamiento: Schema.Types.ObjectId;
    nameAlojamiento: string;
    ciudadAlojamiento: string;
    idUsuario: Schema.Types.ObjectId;
    nameUsuario: string;
    apellidoUsuario: string;
    emailUsuario: string;
    fechaEntrada: string;
    horaEntrada: string;
    fechaSalida: string;
    horaSalida: string;
}

const ReservaAlojamientoSuperAdminSchama = new Schema<ReservaAlojamientoSuperAdmin>(
    {
        nameAlojamiento: String,
        ciudadAlojamiento: String,
        nameUsuario: String,
        apellidoUsuario: String,
        emailUsuario: String,
        fechaEntrada: String,
        horaEntrada: String,
        fechaSalida: String,
        horaSalida: String,

        idAlojamiento: {
            type: Schema.Types.ObjectId,
            ref: "AlojamientoModel"
        },

        idUsuario: {
            type: Schema.Types.ObjectId,
            ref: "UsuarioModel"
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservaAlojamientoSuperAdminModel = model<ReservaAlojamientoSuperAdmin>("ReservaAlojamientoSuperAdmin", ReservaAlojamientoSuperAdminSchama);
export default ReservaAlojamientoSuperAdminModel;