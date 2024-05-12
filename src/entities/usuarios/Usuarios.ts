import { Request, Response } from "express";
import UsuarioModel from "./UsuariosModel";
import ReservaAlojamientosModel from "../ReservaAlojamientos/ReservaAlojamientoUsuarioModel";

//////////////////////   MÉTODO QUE LISTA TODOS USUARIOS   /////////////////////////
const listarTodosUsuarios = async (req: Request, res: Response) => {
    try {

        const usuarios = await UsuarioModel.find()
            .select("name")
            .select("apellido")
            .select("email")
            .select("role")

        res.status(200).json(
            {
                success: true,
                message: "Listado",
                data: usuarios
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erro en listar Usuarios"
        })
    }
}

//////////////////////   MÉTODO ACTUALIZAR USUARIO POR ID  /////////////////////////
const actualizarUsuario = async (req: Request, res: Response) => {
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const idUsuario = req.params.id;
        const name = req.body.name
        const apellido = req.body.apellido
        const password = req.body.password
        const role = req.body.role

        const adminUsuario = await UsuarioModel.findOne({ _id: usuarioAdmin });
        if (!adminUsuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        const usuarioEditar = await UsuarioModel.findById({ _id: idUsuario });
        if (!usuarioEditar) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (!(adminUsuario.role === "superAdmin" || adminUsuario._id.equals(idUsuario)))
            return res.status(403).json({
                success: false,
                message: "No se puede editar usuario"
            })

        adminUsuario.role === "superAdmin" ?
            await UsuarioModel.findByIdAndUpdate(
                {
                    _id: idUsuario
                },
                {
                    name: name,
                    apellido: apellido,
                    password: password,
                    role: role
                },
                {
                    new: true
                }
            )
            :
            await UsuarioModel.findByIdAndUpdate(
                {
                    _id: idUsuario
                },
                {
                    name: name,
                    apellido: apellido,
                    password: password,
                },
                {
                    new: true
                }
            )


        res.status(200).json({
            success: true,
            message: "Usuario actualizado con suceso",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en actualizar usuario"
        })
    }
}

//////////////////////   MÉTODO ELIMINAR USUARIO POR ID   /////////////////////////
const eliminarUsuarioId = async (req: Request, res: Response) => {
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const IdUsuario = req.params.id;

        const adminUsuario = await UsuarioModel.findOne({ _id: usuarioAdmin });
        if (!adminUsuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        const encontrarUsuarioEliminar = await UsuarioModel.findById({ _id: IdUsuario });
        if (!encontrarUsuarioEliminar) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (encontrarUsuarioEliminar.role === "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "No se puede eliminar este usuario"
            })
        }

        await UsuarioModel.findByIdAndDelete(IdUsuario);

        res.status(200).json({
            success: true,
            message: "Usuario eliminado con suceso"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar usuario"
        })
    }
}

//////////////////////   MÉTODO MI PERFIL   /////////////////////////
const miPerfil = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.tokenData.usuarioId;
        const usuario = await UsuarioModel.findOne({ _id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const perfil = await UsuarioModel.find({ _id: usuario?._id })
            .select("name")
            .select("apellido")
            .select("email")


        res.status(200).json(
            {
                success: true,
                message: "Perfil encontrado con suceso",
                data: perfil
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en mostrar los datos del perfil"
        })
    }
}

export {
    listarTodosUsuarios, actualizarUsuario,
    eliminarUsuarioId, miPerfil
}