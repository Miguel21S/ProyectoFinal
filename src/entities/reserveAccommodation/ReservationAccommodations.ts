
import { Request, Response } from "express";
import UsersModel from "../users/UsersModel";
import ReservationAccommodationUsersModel from "./ReservationAccommodationUsersModel";
import ReservationAccommodationSuperAdminModel from "./ReservationAccommodationSuperAdminModel";
import AccommodationsModel from "../accommodation/AccommodationsModel";

//////////////////////   MÉTODO CREAR RESERVA DE ALOJAMIENTO   /////////////////////////
const createReserveAccommodation = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const idAccommodation = req.params.id;
        const { dateInput, timeInput, dateExit, timeExit } = req.body

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const accommodation = await AccommodationsModel.findOne({ _id: idAccommodation });
        if (!accommodation) {
            return res.status(404).json({
                success: false,
                message: "Alojamiento no encontrado"
            })
        }

        const createReservationUser = await ReservationAccommodationUsersModel.create(
            {
                idAccommodation: accommodation._id,
                nameAccommodation: accommodation.name,
                cityAccommodation: accommodation.city,
                idUser: user._id,
                nameUser: user.name,
                lastNameUser: user.lastName,
                emailUser: user.email,
                dateInput: dateInput,
                timeInput: timeInput,
                dateExit: dateExit,
                timeExit: timeExit
            }
        )

        const createReserveSuperAdmin = await ReservationAccommodationSuperAdminModel.create(
            {
                idAccommodation: accommodation._id,
                nameAccommodation: accommodation.name,
                cityAccommodation: accommodation.city,
                idUser: user._id,
                nameUser: user.name,
                lastNameUser: user.lastName,
                emailUser: user.email,
                dateInput: dateInput,
                timeInput: timeInput,
                dateExit: dateExit,
                timeExit: timeExit,
                reservationAccommodationId: createReservationUser._id
            });
            createReservationUser.superAdminReserveId = createReserveSuperAdmin._id;

        res.status(200).json({
            success: true,
            message: "Reserva creada con suceso",
            data: createReservationUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en crear reserva de alojamiento"
        })
    }
}

//////////////////////   MÉTODO LISTAR MIS RESERVA DE ALOJAMIENTO   /////////////////////////
const listReserveAccommodationAdmin = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (user.role !== "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "No se puede mostrar la lista"
            })
        }

        const listAdmin = await ReservationAccommodationSuperAdminModel.find()
            .select("idAccommodation")
            .select("nameAccommodation")
            .select("cityAccommodation")
            .select("idUser")
            .select("nameUser")
            .select("lastNameUser")
            .select("emailUser")
            .select("dateInput")
            .select("timeInput")
            .select("dateExit")
            .select("timeExit")


        res.status(200).json({
            success: true,
            message: "Lista de reservas de alojamiento",
            data: listAdmin
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en listar reservas de alojamiento"
        })
    }
}

//////////////////////   MÉTODO EDITAR RESERVA DE ALOJAMIENTO   /////////////////////////
const editReserveAccommodation = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const idReserveAccommodation = req.params.id;
        const { dateInput, timeInput, dateExit, timeExit } = req.body

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        // const reservaAlojamiento = await ReservaAlojamientoUsuarioModel.findOne({ _id: idReservaAlojamiento });
        // if (!reservaAlojamiento) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Alojamiento no encontrado"
        //     })
        // }

        if (!(user.role === "superAdmin")) {
            return res.status(404).json({
                success: false,
                message: "No se puede permitir editar la reserva"
            })
        }

        // await ReservaAlojamientoUsuarioModel.findByIdAndUpdate(
        //     { _id: idReservaAlojamiento },
        //     {
        //         fechaEntrada,
        //         horaEntrada,
        //         fechaSalida,
        //         horaSalida,
        //     },
        //     {
        //         new: true
        //     }
        // )

        await ReservationAccommodationSuperAdminModel.findByIdAndUpdate(
            { _id: idReserveAccommodation },
            {
                dateInput,
                timeInput,
                dateExit,
                timeExit,
            },
            {
                new: true
            }
        )
        res.status(200).json({
            success: true,
            message: "Reserva actualizada con suceso"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en actualizar reserva de alojamiento"
        })
    }
}

//////////////////////   MÉTODO ELIMINAR RESERVA DE ALOJAMIENTO   /////////////////////////
const deleteReserveAccommodation = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const idReserveAccomodation = req.params.id;

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (user.role !== 'superAdmin') {
            return res.status(403).json({
                success: false,
                message: "No tiene permisos para eliminar esta reserva"
            });
        }

        const rAccommodationSuperAdmin = await ReservationAccommodationSuperAdminModel.findOne({ _id: idReserveAccomodation });
        if (!rAccommodationSuperAdmin) {
            return res.status(404).json({
                success: false,
                message: "Reserva de alojamiento no encontrada en SuperAdminModel"
            });
        }

        const rAccommodationUser = await ReservationAccommodationUsersModel.findOne({ _id: rAccommodationSuperAdmin.reservationAccommodationId });
        await ReservationAccommodationSuperAdminModel.findByIdAndDelete(idReserveAccomodation)

        if (rAccommodationUser) {

            await ReservationAccommodationUsersModel.findByIdAndDelete(rAccommodationUser._id)
        }

        res.status(200).json({
            success: true,
            message: "Reserva eliminada con suceso"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en eliminar reserva de alojamiento"
        })
    }
}

//////////////////////   MÉTODO ELIMINAR RESERVA DE ALOJAMIENTO EN PERFIL DE USUARIO   /////////////////////////
const deleteMyReserveAccommodation = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const idReserveAccommodation = req.params.id;

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const enReserveAccommodation = await ReservationAccommodationUsersModel.findOne({
            _id: idReserveAccommodation,
            idUser: user._id
        });
        if (!enReserveAccommodation) {
            return res.status(404).json({
                success: false,
                message: "Alojamiento no encontrado"
            })
        }

        console.log("enRAlojamiento: ", enReserveAccommodation?.idUser)
        await ReservationAccommodationUsersModel.findByIdAndDelete(idReserveAccommodation)

        res.status(200).json({
            success: true,
            message: "Reserva eliminada con suceso"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en eliminar reserva de alojamiento"
        })
    }
}

//////////////////////   MÉTODO LISTAR MIS RESERVA DE ALOJAMIENTO   /////////////////////////
const mysReserveAccommodation = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const rReserveAccommodation = await ReservationAccommodationUsersModel.find({ idUser: idUser })
        if (!rReserveAccommodation) {
            return res.status(404).json({
                success: false,
                message: "Reservas no encontrado"
            })
        }
        res.status(200).json({
            success: true,
            message: "Mis Reservas encontrado con suceso",
            data: rReserveAccommodation
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en encontrar reservas de alojamiento"
        })
    }
}

export {
    createReserveAccommodation, listReserveAccommodationAdmin, editReserveAccommodation,
    deleteReserveAccommodation, mysReserveAccommodation, deleteMyReserveAccommodation
}