import { Request, Response } from "express";
import UsuarioModel from "../usuarios/UsuariosModel";
import VueloModel from "../vuelos/VuelosModel";
import ReservaVuelosModel from "./ReservaVuelosModel";

///////////////////   MÉTODO HACER RESERVA DE VUELO   ////////////////////
const crearReservaVuelo = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const vueloId = req.params.id;
        const { cantidadAsiento, precioPagar } = req.body;
        let pagar;

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
        vuelo.capacidadAsiento -= cantidadAsiento;
        await vuelo.save();

        pagar = precioPagar === vuelo?.precio ? 1 : 0;

        const rCreada = await ReservaVuelosModel.create({
            pago: pagar,
            cantidadAsiento: cantidadAsiento,
            idUsuario: usuario?.id,
            nameUsuario: usuario?.name,
            emailUsuario: usuario?.email,
            idVuelo: vuelo?.id,
            nameVuelo: vuelo?.name,
            fechaVuelo: vuelo?.fechaIda,
            horaVuelo: vuelo?.horaIda,
        });

        res.status(200).json({
            success: true,
            message: "Reserva creada con suceso",
            data: rCreada
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en hacer reserva"
        })
    }
}

///////////////////   MÉTODO LISTAR RESERVA DE VUELO   ////////////////////
const listaDeReservaDeVuelos = async (req: Request, res: Response) => {
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

        const lista = await ReservaVuelosModel.find()
            .select("emailUsuario")
            .select("nameUsuario")
            .select("idVuelo")
            .select("nameVuelo")
            .select("fechaVuelo")
            .select("horaVuelo")
            .select("cantidad")
            .select("pago")

        res.status(200).json(
            {
                success: true,
                message: "Listado",
                data: lista
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
const actualizarReservaVuelo = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const reservaVueloId = req.params.id;
        const cantidadAsiento = req.body.cantidadAsiento;
        let pago, nuevaCantAsientoVuelo;
        let precioPagar = req.body.precioPagar;

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const rVuelo = await ReservaVuelosModel.findOne({
            _id: reservaVueloId,
            idUsuario: usuarioId
        });

        if (!rVuelo) {
            return res.status(404).json({
                success: false,
                message: "Reserva de Vuelo no encontrado",
            })
        }


        const vuelo = await VueloModel.findOne({ _id: rVuelo?.idVuelo });
        if (!vuelo) {
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado"
            })
        }

        pago = precioPagar === vuelo?.precio ? 1 : 0;
        rVuelo.pago = pago;
        await rVuelo.save();

        if (rVuelo.cantidadAsiento === cantidadAsiento) {
            await vuelo.save()
        } else {
            if (rVuelo.cantidadAsiento > cantidadAsiento) {
                nuevaCantAsientoVuelo = rVuelo.cantidadAsiento;
                rVuelo.cantidadAsiento = cantidadAsiento
                await rVuelo.save();
                vuelo.capacidadAsiento += nuevaCantAsientoVuelo - cantidadAsiento;
                await vuelo.save();
            } else {
                nuevaCantAsientoVuelo = rVuelo.cantidadAsiento;
                rVuelo.cantidadAsiento = cantidadAsiento;
                await rVuelo.save();
                vuelo.capacidadAsiento -= cantidadAsiento - nuevaCantAsientoVuelo;
                await vuelo.save();
            }
        }

        res.status(200).json(
            {
                success: true,
                message: "Reserva de Vuelo actualizado con suceso"
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en actualizar Reserva de Vuelo"
            }
        )
    }
}

//////////////////////   MÉTODO LISTAR MIS RESERVA DE VUELO   /////////////////////////
const misReservarVuelo = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const rReservasVuelos = await ReservaVuelosModel.find({ idUsuario: usuarioId })
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
        const usuarioAdmin = req.tokenData.usuarioId;
        const reservaVueloId = req.params.id;

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
                messages: "Usuario no autorizado"
            })
        }

        const rVuelo = await ReservaVuelosModel.findById({ _id: reservaVueloId });
        if (!rVuelo) {
            return res.status(404).json({
                success: false,
                message: "Reserva de Vuelo no encontrado"
            })
        }

        await ReservaVuelosModel.findByIdAndDelete(reservaVueloId);

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
    crearReservaVuelo, listaDeReservaDeVuelos,
    eliminarReservaVuelo, actualizarReservaVuelo,
    misReservarVuelo
}