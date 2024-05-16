
import { Document, model, Schema } from "mongoose";

interface Usuario extends Document {
    name: string;
    apellido: string;
    email: string;
    password: string;
    role: string;
}

const UsuarioSchema = new Schema<Usuario>(
    {
        name: {
            type: String,
            required: true,
        },

        apellido: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "admin", "superAdmin"],
            default: "user",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const UsuarioModel = model<Usuario>("Usuario", UsuarioSchema);
export default UsuarioModel;