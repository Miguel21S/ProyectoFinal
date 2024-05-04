
import { Schema, model, Document } from "mongoose";

interface Vuelo extends Document {
    name: string;
    aerolinea: string;
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
            required: true,
        },

        aerolinea: {
            type: String,
            required: true,
        },

        origen: {
            type: String,
            required: true,
        },

        destino: {
            type: String,
            required: true,
        },


        precio: {
            type: Number,
            required: true,
        },

        fechaIda: {
            type: String,
            required: true,
        },

        horaIda: {
            type: String,
            required: true,
        },

        fechaRegreso: {
            type: String,
            required: true,
        },

        horaRegreso: {
            type: String,
            required: true,
        },

        fechaRegistro: {
            type: Date,
            default: Date.now
        },
    },
    
)

const VueloModel = model<Vuelo>("Vuelo", VueloSchema);
export default VueloModel;