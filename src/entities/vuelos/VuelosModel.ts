import { Schema, model, Document } from "mongoose";

interface Vuelo extends Document {
    origen: string;
    destino: string;
    aerolinea: string;
    precio: number;
    fechaRegistro: Date;
    // following?: Schema.Types.ObjectId;
    // followers?: Schema.Types.ObjectId[];
}

const VueloSchema = new Schema<Vuelo>(
    {
        origen: {
            type: String,
            required: false,
        },

        destino: {
            type: String,
            required: false,
        },

        aerolinea: {
            type: String,
            required: false,
        },

        precio: {
            type: Number,
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