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
            required: true,
        },

        local: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const AlojamientoModel = model<Alojamiento>("Alojamiento", AlojamientoSchema);
export default AlojamientoModel;