import { Request, Response } from "express";
import UsuarioModel from "./UsuariosModel";

const listarTodosUsuarios = async (req: Request, res:Response) => {
    try {
        
        const usuarios = await UsuarioModel.find()
        .select("name")
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

export {
    listarTodosUsuarios
}