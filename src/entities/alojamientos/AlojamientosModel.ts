import { Document, model, Schema } from "mongoose";


interface Alojamiento extends Document {
    name: string;
    local: string;
    tipo: string;
    precio: number;
}

const AlojamientoSchema = new Schema<Alojamiento>(
    {
        name: {
            type: String,
            required: false,
        },

        local: {
            type: String,
            required: false,
        },
        tipo: {
            type: String,
            required: false,
        },
        precio: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const AlojamientoModel = model<Alojamiento>("Alojamiento", AlojamientoSchema);
export default AlojamientoModel;