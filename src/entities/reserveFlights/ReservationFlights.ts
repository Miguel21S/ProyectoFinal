
import { Request, Response } from "express";
import UsersModel from "../users/UsersModel";
import FlightsModel from "../flights/FlightsModel";
import ReservationFlightsUsersModel from "./ReservationFlightsUsersModel";
import ReservationFlightsSuperAdminModel from "./ReservationFlightsSuperAdminModel";

///////////////////   MÉTODO HACER RESERVA DE VUELO   ////////////////////
const createReserveFlight = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const idFlight = req.params.id;
        const seatcapacity = req.body.seatcapacity;
        const priceOff = req.body.priceOff;
        let valuePrice;

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        if (seatcapacity <= 0) {
            return res.status(400).json({
                success: false,
                message: "La cantidad de asientos debe ser un número positivo"
            });
        }

        const flight = await FlightsModel.findOne({ _id: idFlight });
        if (!flight) {
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado"
            })
        }

        if (flight.seatcapacity - seatcapacity < 0) {
            return res.status(400).json({
                success: false,
                message: "La capacidad de asientos disponible no es suficiente para esta reserva"
            });
        }


        valuePrice = flight?.price * seatcapacity;
        if (priceOff < valuePrice || priceOff > valuePrice) {
            return res.status(400).json({
                success: false,
                message: "Precio a pagar tiene que ser igual a precio * cantidad de reserva",
                Total: `${flight?.price * seatcapacity}`
            });
        }

        flight.seatcapacity -= seatcapacity;
        await flight.save();


        const createReserveUser = await ReservationFlightsUsersModel.create({
            priceOff: priceOff,
            seatcapacity: seatcapacity,
            idUser: user?.id,
            nameUser: user?.name,
            lastNameUser: user?.lastName,
            emailUser: user?.email,
            idFlight: flight?.id,
            nameFlight: flight?.name,
            airlineFlight: flight?.airline,
            originFlight: flight?.origin,
            destinationFlight: flight?.destination,
            dateFlight: flight?.dateDeparture,
            timeFlight: flight?.timeGoTime,
        });

        const createReserveSuperAdmin = await ReservationFlightsSuperAdminModel.create({
            priceOff: priceOff,
            seatcapacity: seatcapacity,
            idUser: user?.id,
            nameUser: user?.name,
            lastNameUser: user?.lastName,
            emailUser: user?.email,
            idFlight: flight?.id,
            nameFlight: flight?.name,
            airlineFlight: flight?.airline,
            originFlight: flight?.origin,
            destinationFlight: flight?.destination,
            dateFlight: flight?.dateDeparture,
            timeFlight: flight?.timeGoTime,
            reservaVueloId: createReserveUser._id
        });
        createReserveUser.superAdminReserveId = createReserveSuperAdmin._id;
        
        res.status(200).json({
            success: true,
            message: "Reserva creada con suceso",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en hacer reserva"
        })
    }
}

///////////////////   MÉTODO LISTAR RESERVA DE VUELO   ////////////////////
const listReserveFlightSuperAdmin = async (req: Request, res: Response) => {
    try {
        const userAdmin = req.tokenData.userId;

        const user = await UsersModel.findOne({ _id: userAdmin });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }
        if (user.role !== "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "No se puede mostrar la lista"
            })
        }

        const listSuperAdmin = await ReservationFlightsSuperAdminModel.find()
            .select("emailUser")
            .select("nameUser")
            .select("idFlight")
            .select("nameFlight")
            .select("airlineFlight")
            .select("dateFlight")
            .select("timeFlight")
            .select("seatcapacity")
            .select("priceOff")

        res.status(200).json(
            {
                success: true,
                message: "Listado",
                data: listSuperAdmin
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erro en listar Reservas de Vuelos"
        })
    }
}

//////////////////////   MÉTODO ACTUALIZAR RESERVA DE VUELO   /////////////////////////
// const actualizarReservaVuelo = async (req: Request, res: Response) => {
//     try {
//         const usuarioId = req.tokenData.usuarioId;
//         const reservaVueloId = req.params.id;
//         const cantidadAsiento = req.body.cantidadAsiento;
//         const precioPagar = req.body.precioPagar;
//         let nuevaCantAsientoVuelo, valorApagar;

//         const usuario = await UsuarioModel.findOne({ _id: usuarioId });
//         if (!usuario) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Usuario no encontrado"
//             })
//         }

//         const rVuelo = await ReservaVuelosUsuariosModel.findOne({
//             _id: reservaVueloId
//         });

//         if (!rVuelo) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Reserva de Vuelo no encontrado",
//             })
//         }

//         const vuelo = await VueloModel.findOne({ _id: rVuelo?.idVuelo });
//         if (!vuelo) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Vuelo no encontrado"
//             })
//         }

//         if (cantidadAsiento <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "La cantidad de asientos debe ser un número positivo"
//             });
//         }

//         if (vuelo.capacidadAsiento - cantidadAsiento < 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "La capacidad de asientos disponible no es suficiente para esta reserva"
//             });
//         }

//         valorApagar = vuelo?.precio * cantidadAsiento;
//         if (precioPagar < valorApagar || precioPagar > valorApagar) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Precio a pagar tiene que ser igual a precio * cantidad de reserva",
//                 Total: `${vuelo?.precio * cantidadAsiento}`
//             });
//         }

//         rVuelo.precioPagar = precioPagar;
//         await rVuelo.save();

//         if (rVuelo.cantidadAsiento === cantidadAsiento) {
//             await vuelo.save()
//         } else {
//             if (rVuelo.cantidadAsiento > cantidadAsiento) {
//                 nuevaCantAsientoVuelo = rVuelo.cantidadAsiento;
//                 rVuelo.cantidadAsiento = cantidadAsiento
//                 await rVuelo.save();
//                 vuelo.capacidadAsiento += nuevaCantAsientoVuelo - cantidadAsiento;
//                 await vuelo.save();
//             } else {
//                 nuevaCantAsientoVuelo = rVuelo.cantidadAsiento;
//                 rVuelo.cantidadAsiento = cantidadAsiento;
//                 await rVuelo.save();
//                 vuelo.capacidadAsiento -= cantidadAsiento - nuevaCantAsientoVuelo;
//                 await vuelo.save();
//             }
//         }

//         res.status(200).json(
//             {
//                 success: true,
//                 message: "Reserva de Vuelo actualizado con suceso"
//             }
//         )
//     } catch (error) {
//         return res.status(500).json(
//             {
//                 success: false,
//                 message: "Error en actualizar Reserva de Vuelo"
//             }
//         )
//     }
// }

//////////////////////   MÉTODO LISTAR MIS RESERVA DE VUELO   /////////////////////////
const myReserveFlightUser = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        const user = await UsersModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }


        const rReserveFligth = await ReservationFlightsUsersModel.find({ idUser: userId })
            .select("nameUser")
            .select("lastNameUser")
            .select("emailUser")
            .select("nameFlight")
            .select("airlineFlight")
            .select("originFlight")
            .select("destinationFlight")
            .select("dateFlight")
            .select("priceOff")

        res.status(200).json({
            success: true,
            message: "Mis Reservas de Vuelos encontrado con suceso",
            data: rReserveFligth
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en encontrar Reservas de Vuelos"
        })
    }
}

///////////////////   MÉTODO ELIMINAR RESERVA DE VUELO   ////////////////////
const deletereserveFlight = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const reserveFligthId = req.params.id;

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (user.role !== 'superAdmin') {
            return res.status(403).json({
                success: false,
                message: "No tiene permisos para eliminar esta reserva"
            });
        }

        const rFligthSuperAdmin = await ReservationFlightsSuperAdminModel.findOne({ _id: reserveFligthId });
        if (!rFligthSuperAdmin) {
            return res.status(404).json({
                success: false,
                message: "Reserva de Vuelo no encontrada en SuperAdminModel"
            });
        }

        const rFlightUser = await ReservationFlightsUsersModel.findOne({ _id: rFligthSuperAdmin.reserveFlightId });
        await ReservationFlightsSuperAdminModel.findByIdAndDelete(reserveFligthId);

        if (rFlightUser ) {
            await ReservationFlightsUsersModel.findByIdAndDelete(rFlightUser._id);
        }
        
        res.status(200).json({
            success: true,
            message: "Reserva de Vuelo eliminada con éxito"
        });

    } catch (error) {
        console.error("Error al eliminar Reserva de Vuelo: ", error);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar Reserva de Vuelo"
        });
    }
};

///////////////////   MÉTODO ELIMINAR RESERVA DE VUELO EN PERFIL DE USUARIO   ////////////////////
const deleteMyReserveFlight = async (req: Request, res: Response) => {
    try {
        const idUser = req.tokenData.userId;
        const idReserveFlight = req.params.id;

        const user = await UsersModel.findOne({ _id: idUser });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const enRVuelo = await ReservationFlightsUsersModel.findOne({
            _id: idReserveFlight,
            idUser: user._id
        })
        if (!enRVuelo) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado en reserva de vuelo"
            })
        }
        await ReservationFlightsUsersModel.findByIdAndDelete(idReserveFlight)

        res.status(200).json({
            success: true,
            message: "Reserva de Vuelo eliminado con suceso"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar Reserva de Vuelo"
        })
    }

}

export {
    createReserveFlight, listReserveFlightSuperAdmin,
    myReserveFlightUser, deletereserveFlight, deleteMyReserveFlight
}