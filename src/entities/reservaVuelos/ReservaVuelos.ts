import { Request, Response } from "express";
import UsuarioModel from "../usuarios/UsuariosModel";
import VueloModel from "../vuelos/VuelosModel";
import ReservaVuelosModel from "./ReservaVuelosModel";

///////////////////   MÉTODO HACER RESERVA DE VUELO   ////////////////////
const crearReservaVuelo = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const vueloId = req.params.id;
        let pagar;
        let precioPagar = req.body.precioPagar;

        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const rVuelo = await VueloModel.findOne({ _id: vueloId });
        if (!rVuelo) {
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado"
            })
        }
        pagar = precioPagar === rVuelo?.precio ? 1 : 0;

        const rCreada = await ReservaVuelosModel.create({
            pago: pagar,
            idUsuario: usuario?.id,
            nameUsuario: usuario?.name,
            idVuelo: rVuelo?.id,
            nameVuelo: rVuelo?.name,
            fechaVuelo: rVuelo?.fechaIda,
            horaVuelo: rVuelo?.horaIda,
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
            .select("idUsuario")
            .select("nameUsuario")
            .select("idVuelo")
            .select("nameVuelo")
            .select("fechaVuelo")
            .select("horaVuelo")
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

///////////////////   MÉTODO ELIMINAR RESERVA DE VUELO   ////////////////////
const eliminarReservaVuelo = async (req: Request, res: Response) =>{
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const reservaVueloId = req.params.id;

        const usuario = await UsuarioModel.findOne({_id: usuarioAdmin});
        if(!usuario){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }
        
        if(usuario.role  !== "superAdmin"){
            return res.status(404).json({
                success: false,
                messages: "Usuario no autorizado"
            })
        }

        const rVuelo = await ReservaVuelosModel.findById({ _id: reservaVueloId });
        if(!rVuelo){
            return res.status(404).json({
                success: false,
                message: "Reserva de Vuelo no encontrado"
            })
        }
        
        await ReservaVuelosModel.findByIdAndDelete( reservaVueloId );

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
    eliminarReservaVuelo
}