
import { Request, Response } from "express";
import UsuarioModel from "../usuarios/UsuariosModel";
import VueloModel from "../vuelos/VuelosModel";
import ReservaVuelosUsuariosModel from "./ReservaVuelosUsuariosModel";
import ReservaVueloSuperAdminModel from "./ReservaVueloSuperAdminModel";

///////////////////   MÉTODO HACER RESERVA DE VUELO   ////////////////////
const crearReservaVuelo = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const vueloId = req.params.id;
        const cantidadAsiento = req.body.cantidadAsiento;
        const precioPagar = req.body.precioPagar;
        let valorApagar;

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        if (cantidadAsiento <= 0) {
            return res.status(400).json({
                success: false,
                message: "La cantidad de asientos debe ser un número positivo"
            });
        }

        const vuelo = await VueloModel.findOne({ _id: vueloId });
        if (!vuelo) {
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado"
            })
        }

        if (vuelo.capacidadAsiento - cantidadAsiento < 0) {
            return res.status(400).json({
                success: false,
                message: "La capacidad de asientos disponible no es suficiente para esta reserva"
            });
        }


        valorApagar = vuelo?.precio * cantidadAsiento;
        if (precioPagar < valorApagar || precioPagar > valorApagar) {
            return res.status(400).json({
                success: false,
                message: "Precio a pagar tiene que ser igual a precio * cantidad de reserva",
                Total: `${vuelo?.precio * cantidadAsiento}`
            });
        }

        vuelo.capacidadAsiento -= cantidadAsiento;
        await vuelo.save();


        const rCreadaUsuario = await ReservaVuelosUsuariosModel.create({
            precioPagar: precioPagar,
            cantidadAsiento: cantidadAsiento,
            idUsuario: usuario?.id,
            nameUsuario: usuario?.name,
            nameApellido: usuario?.apellido,
            emailUsuario: usuario?.email,
            idVuelo: vuelo?.id,
            nameVuelo: vuelo?.name,
            aerolineaVuelo: vuelo?.aerolinea,
            origenVuelo: vuelo?.origen,
            destinoVuelo: vuelo?.destino,
            fechaVuelo: vuelo?.fechaIda,
            horaVuelo: vuelo?.horaIda,
        });

        const rCreadaSuperAdmin = await ReservaVueloSuperAdminModel.create({
            precioPagar: precioPagar,
            cantidadAsiento: cantidadAsiento,
            idUsuario: usuario?.id,
            nameUsuario: usuario?.name,
            nameApellido: usuario?.apellido,
            emailUsuario: usuario?.email,
            idVuelo: vuelo?.id,
            nameVuelo: vuelo?.name,
            aerolineaVuelo: vuelo?.aerolinea,
            origenVuelo: vuelo?.origen,
            destinoVuelo: vuelo?.destino,
            fechaVuelo: vuelo?.fechaIda,
            horaVuelo: vuelo?.horaIda,
            reservaVueloId: rCreadaUsuario._id
        });
        rCreadaUsuario.superAdminReservaId = rCreadaSuperAdmin._id;
        
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
const listaDeReservaDeVuelosAdmin = async (req: Request, res: Response) => {
    try {
        const usuarioAdmin = req.tokenData.usuarioId;

        const usuario = await UsuarioModel.findOne({ _id: usuarioAdmin });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }
        if (usuario.role !== "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "No se puede mostrar la lista"
            })
        }

        const listaSuperAdmin = await ReservaVueloSuperAdminModel.find()
            .select("emailUsuario")
            .select("nameUsuario")
            .select("idVuelo")
            .select("nameVuelo")
            .select("aerolineaVuelo")
            .select("fechaVuelo")
            .select("horaVuelo")
            .select("cantidadAsiento")
            .select("precioPagar")

        res.status(200).json(
            {
                success: true,
                message: "Listado",
                data: listaSuperAdmin
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
const misReservarVueloUsuario = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }


        const rReservasVuelos = await ReservaVuelosUsuariosModel.find({ idUsuario: usuarioId })
            .select("nameUsuario")
            .select("nameApellido")
            .select("emailUsuario")
            .select("nameVuelo")
            .select("aerolineaVuelo")
            .select("origeVuelo")
            .select("origenVuelo")
            .select("destinoVuelo")
            .select("horaVuelo")
            .select("precioPagar")

        res.status(200).json({
            success: true,
            message: "Mis Reservas de Vuelos encontrado con suceso",
            data: rReservasVuelos
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en encontrar Reservas de Vuelos"
        })
    }
}

///////////////////   MÉTODO ELIMINAR RESERVA DE VUELO   ////////////////////
const eliminarReservaVuelo = async (req: Request, res: Response) => {
    try {
        const idUsuario = req.tokenData.usuarioId;
        const reservaVueloId = req.params.id;

        const usuario = await UsuarioModel.findOne({ _id: idUsuario });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (usuario.role !== 'superAdmin') {
            return res.status(403).json({
                success: false,
                message: "No tiene permisos para eliminar esta reserva"
            });
        }

        const rVueloSuperAdmin = await ReservaVueloSuperAdminModel.findOne({ _id: reservaVueloId });
        if (!rVueloSuperAdmin) {
            return res.status(404).json({
                success: false,
                message: "Reserva de Vuelo no encontrada en SuperAdminModel"
            });
        }

        const rVueloUsuario = await ReservaVuelosUsuariosModel.findOne({ _id: rVueloSuperAdmin.reservaVueloId });
        await ReservaVueloSuperAdminModel.findByIdAndDelete(reservaVueloId);

        if (rVueloUsuario ) {
            await ReservaVuelosUsuariosModel.findByIdAndDelete(rVueloUsuario._id);
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
const eliminarMiReservaVuelo = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const idReservaVuelo = req.params.id;

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const enRVuelo = await ReservaVuelosUsuariosModel.findOne({
            _id: idReservaVuelo,
            idUsuario: usuario._id
        })
        if (!enRVuelo) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado en reserva de vuelo"
            })
        }
        await ReservaVuelosUsuariosModel.findByIdAndDelete(idReservaVuelo)

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
    crearReservaVuelo, listaDeReservaDeVuelosAdmin,
    eliminarReservaVuelo, misReservarVueloUsuario, eliminarMiReservaVuelo
}