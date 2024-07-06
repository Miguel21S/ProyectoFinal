import { Document, model, Schema } from "mongoose";

interface ReservationAccommodationUser extends Document {
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
    superAdminReserveId: Schema.Types.ObjectId;
}

const ReservationAccommodationUsersSchama = new Schema<ReservationAccommodationUser>(
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

        superAdminReserveId: {
            type: Schema.Types.ObjectId,
            ref: "ReservationAccommodationSuperAdminModel"
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const ReservationAccommodationModel = model<ReservationAccommodationUser>("ReservationAccommodationModel", ReservationAccommodationUsersSchama);
export default ReservationAccommodationModel;