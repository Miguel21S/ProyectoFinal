
import { Schema, model, Document } from "mongoose";

interface Vuelo extends Document {
    name: string;
    aerolinea: string;
    capacidadAsiento: number;
    origen: string;
    destino: string;
    precio: number;
    fechaIda: string;
    horaIda: string;
    fechaRegreso: string;
    horaRegreso: string;
    fechaRegistro: Date;

    // following?: Schema.Types.ObjectId;
    // followers?: Schema.Types.ObjectId[];
}

const VueloSchema = new Schema<Vuelo>(
    {
        name: {
            type: String,
            required: false,
        },
        aerolinea: {
            type: String,
            required: false,
        },
        capacidadAsiento: {
            type: Number,
            required: true,
        },
        origen: {
            type: String,
            required: false,
        },
        destino: {
            type: String,
            required: false,
        },
        precio: {
            type: Number,
            required: true,
        },
        fechaIda: {
            type: String,
            required: false,
        },
        horaIda: {
            type: String,
            required: false,
        },
        fechaRegreso: {
            type: String,
            required: false,
        },
        horaRegreso: {
            type: String,
            required: false,
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        },
    },
    
)

const VueloModel = model<Vuelo>("Vuelo", VueloSchema);
export default VueloModel;