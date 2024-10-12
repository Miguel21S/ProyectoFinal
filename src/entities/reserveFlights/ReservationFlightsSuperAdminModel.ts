/* import { Document, model, Schema } from "mongoose";

interface ReservationFlightsSuperAdmin extends Document {
    idUser: Schema.Types.ObjectId;
    nameUser: string;
    lastNameUser: string;
    emailUser: string;
    idFlight: Schema.Types.ObjectId;
    nameFlight: string;
    airlineFlight: string;
    originFlight: string;
    destinationFlight: string;
    dateFlight: string;
    timeFlight: string;
    seatcapacity: number;
    priceOff: number;
    reserveFlightId: Schema.Types.ObjectId;
}

const ReservationFlightsSuperAdminModelSchema = new Schema<ReservationFlightsSuperAdmin>(
    {
        nameUser: String,
        lastNameUser: String,
        emailUser: String,
        nameFlight: String,
        airlineFlight: String,
        originFlight: String,
        destinationFlight: String,
        dateFlight: String,
        timeFlight: String,

        idUser:
        {
            type: Schema.Types.ObjectId,
            ref: "UsersModel"
        },

        idFlight:
        {
            type: Schema.Types.ObjectId,
            ref: "FlightModel"
        },

        seatcapacity: {
            type: Number,
            required: true,
        },

        priceOff: {
            type: Number,
            required: true,
        },

        reserveFlightId: {
            type: Schema.Types.ObjectId,
            ref: "ReservationFlightsUsersModel"
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservationFlightsSuperAdminModel = model<ReservationFlightsSuperAdmin>("ReservationFlightsSuperAdmin", ReservationFlightsSuperAdminModelSchema);
export default ReservationFlightsSuperAdminModel; */


