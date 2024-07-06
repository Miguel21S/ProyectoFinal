
import { Schema, model, Document } from "mongoose";

interface Flight extends Document {
    name: string;
    airline: string;
    seatcapacity: number;
    origin: string;
    destination: string;
    price: number;
    dateDeparture: string;
    timeGoTime: string;
    dateReturn: string;
    timeReturn: string;
    dateRecord: Date;

    // following?: Schema.Types.ObjectId;
    // followers?: Schema.Types.ObjectId[];
}

const FlightSchema = new Schema<Flight>(
    {
        name: {
            type: String,
            required: false,
        },
        airline: {
            type: String,
            required: false,
        },
        seatcapacity: {
            type: Number,
            required: true,
        },
        origin: {
            type: String,
            required: false,
        },
        destination: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
        },
        dateDeparture: {
            type: String,
            required: false,
        },
        timeGoTime: {
            type: String,
            required: false,
        },
        dateReturn: {
            type: String,
            required: false,
        },
        timeReturn: {
            type: String,
            required: false,
        },
        dateRecord: {
            type: Date,
            default: Date.now
        },
    },
    
)

const FlightModel = model<Flight>("Flight", FlightSchema);
export default FlightModel;