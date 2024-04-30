import { Request, Response } from "express";
import UsuarioModel from "./UsuariosModel";

const listarTodosUsuarios = async (req: Request, res:Response) => {
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

const eliminarUsuarioId = async (req: Request, res: Response)=> {
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const IdUsuario = req.params.id;

        const adminUsuario =await UsuarioModel.findOne({_id: usuarioAdmin});
        if(!adminUsuario){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }
        

        const encontrarUsuarioEliminar = await UsuarioModel.findById({ _id: IdUsuario });
        if(!encontrarUsuarioEliminar){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        
        if(encontrarUsuarioEliminar?._id.usuarioRole === "SuperAdmin"){
            return res.status(404).json({
                success: false,
                messages: "No se puede eliminar este usuario"
            })
        }
        console.log(IdUsuario)
        await UsuarioModel.findByIdAndDelete( IdUsuario );

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

export {
    listarTodosUsuarios, eliminarUsuarioId
}