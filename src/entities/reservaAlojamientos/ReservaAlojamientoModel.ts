import { Document, model, Schema } from "mongoose";


interface ReservaAlojamientos extends Document {
    idAlojamiento: Schema.Types.ObjectId;
    nameAlojamiento: string;
    idUsuario: Schema.Types.ObjectId;
    nameUsuario: string;
    apellidoUsuario: string;
    emailUsuario: string;
    fechaEntrada: string;
    horaEntrada: string;
    fechaSalida: string;
    horaSalida: string;
}

const ReservaAlojamientoSchama = new Schema<ReservaAlojamientos>(
    {
        nameAlojamiento: String,
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
const ReservaAlojamientosModel = model<ReservaAlojamientos>("ReservaAlojamientos", ReservaAlojamientoSchama);
export default ReservaAlojamientosModel;