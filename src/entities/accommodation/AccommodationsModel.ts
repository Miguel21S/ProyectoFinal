
import { Document, model, Schema } from "mongoose";
import { types } from "util";


interface Accommodation extends Document {
    name: string;
    city: string;
    kinds: string;
    price: number;
}

const AccommodationsSchema = new Schema<Accommodation>(
    {
        name: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },
        kinds: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const AccommodationsModel = model<Accommodation>("Accommodation", AccommodationsSchema);
export default AccommodationsModel;