import { Document, model, Schema } from "mongoose";

interface Usuario extends Document {
    nombre: string;
    email: string;
    password: string;
    role: string;
}

const UsuarioSchema = new Schema<Usuario>(
    {
        nombre: {
            type: String,
            required: false,
        },

        email: {
            type: String,
            required: false,
            unique: true,
        },

        password: {
            type: String,
            required: false,
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