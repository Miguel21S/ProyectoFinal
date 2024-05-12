
import { Request, Response } from "express";
import UsuarioModel from "../usuarios/UsuariosModel";
import AlojamientoModel from "./AlojamientosModel";

//////////////////////   MÉTODO CREAR ALOJAMIENTO  /////////////////////////
const crearAlojamiento = async (req: Request, res: Response) => {
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const precio = req.body.precio;
        const { name, ciudad, tipo } = req.body

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

        await AlojamientoModel.create({
            name: name,
            ciudad: ciudad,
            tipo: tipo,
            precio: precio
        })

        res.status(200).json(
            {
                success: true,
                message: "Alojamiento adicionado con suceso",
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en crear alojamiento"
            }
        )
    }
}

//////////////////////   MÉTODO LISTA ALOJAMIENTO  /////////////////////////
const listarAlojamiento = async (req: Request, res: Response) => {
    try {
        const alojamientos = await AlojamientoModel.find()
            .select("name")
            .select("ciudad")
            .select("tipo")
            .select("precio")

        res.status(200).json(
            {
                success: true,
                message: "Lista de alojamientos",
                data: alojamientos
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en listar alojamientos"
            }
        )
    }
}

//////////////////////   MÉTODO EDITAR ALOJAMIENTO  /////////////////////////
const actualizarAlojamiento = async (req: Request, res: Response) => {
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const alojamientoId = req.params.id;
        const { name, ciudad, tipo, precio} = req.body;

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

        const alojamientos = await AlojamientoModel.findOne({ _id: alojamientoId });
        if (!alojamientos) {
            return res.status(404).json({
                success: false,
                message: "No se pudo encontrar alojamiento"
            })
        }

        await AlojamientoModel.findByIdAndUpdate(
            {
                _id: alojamientoId
            },
            {
                name: name,
                ciudad: ciudad,
                tipo: tipo,
                precio: precio
            }
        );
        res.status(200).json(
            {
                success: true,
                message: "Alojamiento actualizado con suceso",
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en actualizar alojamiento"
            }
        )
    }
}

//////////////////////   MÉTODO ELIMINAR ALOJAMIENTO  /////////////////////////
const eliminarAlojamiento = async (req: Request, res: Response) => {
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const alojamientoId = req.params.id;

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

        const alojamientos = await AlojamientoModel.findOne({ _id: alojamientoId });
        if (!alojamientos) {
            return res.status(404).json({
                success: false,
                message: "No se pudo encontrar alojamiento"
            })
        }

        await AlojamientoModel.findByIdAndDelete(alojamientoId);
        res.status(200).json(
            {
                success: true,
                message: "Alojamiento eliminado con suceso",
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en eliminar alojamientos"
            }
        )
    }
}
export {
    crearAlojamiento, listarAlojamiento,
    eliminarAlojamiento, actualizarAlojamiento
}