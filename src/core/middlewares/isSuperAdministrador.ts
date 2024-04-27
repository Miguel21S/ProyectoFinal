import { NextFunction, Response } from "express";
import { CustomRequest } from "./auth";
import UsuarioModel from "../../entities/usuarios/UsuariosModel";

export const isSuperAdmin = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let usuarioRole;
        const usuario = await UsuarioModel.findById( { _id: req.tokenData.usuarioId} );

        if(!usuario){
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no encontrado"
                }
            )
        }

        usuarioRole = usuario.role;
        if(usuarioRole !== "superAdmin"){
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no autorizado"
                }
            )
        }
        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Permiso de negado"
            }
        )
    }
}