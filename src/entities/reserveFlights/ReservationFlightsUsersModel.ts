

import { Document, model, Schema } from "mongoose";

interface ReservationFlightsUser extends Document {
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
    isDeleted: boolean;
}

const ReservationFlightsUsersSchema = new Schema<ReservationFlightsUser>(
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
        
        idUser: {
            type: Schema.Types.ObjectId,
            ref: "UsersModel"
        },

        idFlight: {
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

        isDeleted: {
            type: Boolean,
            default: true, // Cambiado a false
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ReservationFlightsUsersModel = model<ReservationFlightsUser>("ReservaVuelosUsuarios", ReservationFlightsUsersSchema);
export default ReservationFlightsUsersModel;

/* import { Document, model, Schema } from "mongoose";

interface ReservationFlightsUser extends Document {
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
    superAdminReserveId: Schema.Types.ObjectId;
}

const ReservationFlightsUsersSchema = new Schema<ReservationFlightsUser>(
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

        superAdminReserveId: {
            type: Schema.Types.ObjectId,
            ref: "ReservationFlightsSuperAdminModel"
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservationFlightsUsersModel = model<ReservationFlightsUser>("ReservaVuelosUsuarios", ReservationFlightsUsersSchema);
export default ReservationFlightsUsersModel; */