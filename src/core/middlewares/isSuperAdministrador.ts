import { NextFunction, Response } from "express";
import { CustomRequest } from "./auth";
import UsersModel from "../../entities/users/UsersModel";

export const isSuperAdmin = async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let userRole;
        const user = await UsersModel.findById( { _id: req.tokenData.userId} );

        if(!user){
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario no encontrado"
                }
            )
        }

        userRole = user.role;
        if(userRole !== "superAdmin"){
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