import { Document, model, Schema } from "mongoose";

interface ReservaVueloSuperAdmin extends Document {
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
    reservaVueloId: Schema.Types.ObjectId;
}

const ReservaVueloSuperAdminModelSchema = new Schema<ReservaVueloSuperAdmin>(
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

        reservaVueloId: {
            type: Schema.Types.ObjectId,
            ref: "ReservaVuelosUsuarios"
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservaVueloSuperAdminModel = model<ReservaVueloSuperAdmin>("ReservaVueloSuperAdmin", ReservaVueloSuperAdminModelSchema);
export default ReservaVueloSuperAdminModel;