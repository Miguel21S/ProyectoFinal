
import { Request, Response } from "express";
import UsuarioModel from "../usuarios/UsuariosModel";
import ReservaAlojamientoUsuarioModel from "./ReservaAlojamientoUsuarioModel";
import ReservaAlojamientoSuperAdminModel from "./ReservaAlojamientoSuperAdminModel";
import AlojamientoModel from "../alojamientos/AlojamientosModel";

//////////////////////   MÉTODO CREAR RESERVA DE ALOJAMIENTO   /////////////////////////
const crearReservaAlojamiento = async (req: Request, res: Response) => {
    try {
        const idUsuario = req.tokenData.usuarioId;
        const idAlojamiento = req.params.id;
        const { fechaEntrada, horaEntrada, fechaSalida, horaSalida } = req.body

        const usuario = await UsuarioModel.findOne({ _id: idUsuario });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const alojamiento = await AlojamientoModel.findOne({ _id: idAlojamiento });
        if (!alojamiento) {
            return res.status(404).json({
                success: false,
                message: "Alojamiento no encontrado"
            })
        }

        const crearreservaUsuario = await ReservaAlojamientoUsuarioModel.create(
            {
                idAlojamiento: alojamiento._id,
                nameAlojamiento: alojamiento.name,
                ciudadAlojamiento: alojamiento.ciudad,
                idUsuario: usuario._id,
                nameUsuario: usuario.name,
                apellidoUsuario: usuario.apellido,
                emailUsuario: usuario.email,
                fechaEntrada: fechaEntrada,
                horaEntrada: horaEntrada,
                fechaSalida: fechaSalida,
                horaSalida: horaSalida
            }
        )

        const crearreservaSuperAdmin = await ReservaAlojamientoSuperAdminModel.create(
            {
                idAlojamiento: alojamiento._id,
                nameAlojamiento: alojamiento.name,
                ciudadAlojamiento: alojamiento.ciudad,
                idUsuario: usuario._id,
                nameUsuario: usuario.name,
                apellidoUsuario: usuario.apellido,
                emailUsuario: usuario.email,
                fechaEntrada: fechaEntrada,
                horaEntrada: horaEntrada,
                fechaSalida: fechaSalida,
                horaSalida: horaSalida
            }
        )

        res.status(200).json({
            success: true,
            message: "Reserva creada con suceso",
            data: crearreservaUsuario
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en crear reserva de alojamiento"
        })
    }
}

//////////////////////   MÉTODO LISTAR MIS RESERVA DE ALOJAMIENTO   /////////////////////////
const listarReservaAlojamientoAdmin = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (usuario.role !== "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "No se puede mostrar la lista"
            })
        }

        const listaAdmin = await ReservaAlojamientoSuperAdminModel.find()
            .select("idAlojamiento")
            .select("nameAlojamiento")
            .select("ciudadAlojamiento")
            .select("idUsuario")
            .select("nameUsuario")
            .select("apellidoUsuario")
            .select("emailUsuario")
            .select("fechaEntrada")
            .select("horaEntrada")
            .select("emailUsuario")
            .select("fechaSalida")
            .select("horaSalida")


        res.status(200).json({
            success: true,
            message: "Lista de reservas de alojamiento",
            data: listaAdmin
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en listar reservas de alojamiento"
        })
    }
}

//////////////////////   MÉTODO EDITAR RESERVA DE ALOJAMIENTO   /////////////////////////
const editarReservaAlojamiento = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const idReservaAlojamiento = req.params.id;
        const { fechaEntrada, horaEntrada, fechaSalida, horaSalida } = req.body

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
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

        if (!(usuario.role === "superAdmin")) {
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

        await ReservaAlojamientoSuperAdminModel.findByIdAndUpdate(
            { _id: idReservaAlojamiento },
            {
                fechaEntrada,
                horaEntrada,
                fechaSalida,
                horaSalida,
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
const eliminarReservaAlojamiento = async (req: Request, res: Response) => {
    try {
        const idUsuario = req.tokenData.usuarioId;
        const idReservaAlojamiento = req.params.id;

        const usuario = await UsuarioModel.findOne({ _id: idUsuario });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (usuario.role === "superAdmin") {
            const reservaAlojamiento = await ReservaAlojamientoSuperAdminModel.findOne({ _id: idReservaAlojamiento });
            if (!reservaAlojamiento) {
                return res.status(404).json({
                    success: false,
                    message: "Alojamiento no encontrado"
                })
            }
            await ReservaAlojamientoSuperAdminModel.findByIdAndDelete(idReservaAlojamiento)
            await ReservaAlojamientoUsuarioModel.findByIdAndDelete(idReservaAlojamiento)

        } else if (usuario._id.equals(idUsuario)) {
            
            const reservaAlojamiento = await ReservaAlojamientoUsuarioModel.findOne({ _id: idReservaAlojamiento });
            if (!reservaAlojamiento) {
                return res.status(404).json({
                    success: false,
                    message: "Alojamiento no encontrado"
                })
            }
            await ReservaAlojamientoUsuarioModel.findByIdAndDelete(idReservaAlojamiento)
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

//////////////////////   MÉTODO LISTAR MIS RESERVA DE ALOJAMIENTO   /////////////////////////
const misReservarAlojamiento = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const rReservasAlojamiento = await ReservaAlojamientoUsuarioModel.find({ idUsuario: usuarioId })
        if (!rReservasAlojamiento) {
            return res.status(404).json({
                success: false,
                message: "Reservas no encontrado"
            })
        }
        res.status(200).json({
            success: true,
            message: "Mis Reservas encontrado con suceso",
            data: rReservasAlojamiento
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en encontrar reservas de alojamiento"
        })
    }
}

export {
    crearReservaAlojamiento, listarReservaAlojamientoAdmin, editarReservaAlojamiento,
    eliminarReservaAlojamiento, misReservarAlojamiento
}