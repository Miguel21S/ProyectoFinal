
import { Document, model, Schema } from "mongoose";

interface User extends Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },

        lastName: {
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

const UsersModel = model<User>("User", UserSchema);
export default UsersModel;