import { Document, model, Schema } from "mongoose";


interface ReservationAccommodationSuperAdmin extends Document {
    idAccommodation: Schema.Types.ObjectId;
    nameAccommodation: string;
    cityAccommodation: string;
    idUser: Schema.Types.ObjectId;
    nameUser: string;
    lastNameUser: string;
    emailUser: string;
    dateInput: string;
    timeInput: string;
    dateExit: string;
    timeExit: string;
    reservationAccommodationId: Schema.Types.ObjectId;
}

const ReservationAccommodationSuperAdminSchama = new Schema<ReservationAccommodationSuperAdmin>(
    {
        nameAccommodation: String,
        cityAccommodation: String,
        nameUser: String,
        lastNameUser: String,
        emailUser: String,
        dateInput: String,
        timeInput: String,
        dateExit: String,
        timeExit: String,

        idAccommodation: {
            type: Schema.Types.ObjectId,
            ref: "AccommodationsModel"
        },

        idUser: {
            type: Schema.Types.ObjectId,
            ref: "UsersModel"
        },

        reservationAccommodationId: {
            type: Schema.Types.ObjectId,
            ref: "ReservationAccommodationModel"
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservationAccommodationSuperAdminModel = model<ReservationAccommodationSuperAdmin>("ReservationAccommodationSuperAdmin", ReservationAccommodationSuperAdminSchama);
export default ReservationAccommodationSuperAdminModel;