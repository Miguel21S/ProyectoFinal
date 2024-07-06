
import { Request, Response } from "express";
import UsersModel from "./UsersModel";

//////////////////////   MÉTODO QUE LISTA TODOS USUARIOS   /////////////////////////
const listAllUsers = async (req: Request, res: Response) => {
    try {

        const users = await UsersModel.find()
            .select("name")
            .select("lastName")
            .select("email")
            .select("role")

        res.status(200).json(
            {
                success: true,
                message: "Listado",
                data: users
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
const updateUsers = async (req: Request, res: Response) => {
    try {
        const userAdmin = req.tokenData.userId;
        const idUser = req.params.id;
        const name = req.body.name
        const lastName = req.body.lastName
        const password = req.body.password
        const role = req.body.role

        const adminUser = await UsersModel.findOne({ _id: userAdmin });
        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        const userEdit = await UsersModel.findById({ _id: idUser });
        if (!userEdit) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (!(adminUser.role === "superAdmin" || adminUser._id.equals(idUser)))
            return res.status(403).json({
                success: false,
                message: "No se puede editar usuario"
            })

        adminUser.role === "superAdmin" ?
            await UsersModel.findByIdAndUpdate(
                {
                    _id: idUser
                },
                {
                    name: name,
                    lastName: lastName,
                    password: password,
                    role: role
                },
                {
                    new: true
                }
            )
            :
            await UsersModel.findByIdAndUpdate(
                {
                    _id: idUser
                },
                {
                    name: name,
                    lastName: lastName,
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
const deleteUsersById = async (req: Request, res: Response) => {
    try {
        const userAdmin = req.tokenData.userId;
        const IdUser = req.params.id;

        const adminUser = await UsersModel.findOne({ _id: userAdmin });
        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        const findUserDelete = await UsersModel.findById({ _id: IdUser });
        if (!findUserDelete) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (findUserDelete.role === "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "No se puede eliminar este usuario"
            })
        }

        await UsersModel.findByIdAndDelete(IdUser);

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
const myProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const user = await UsersModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const profile = await UsersModel.find({ _id: user?._id })
            .select("name")
            .select("lastName")
            .select("email")


        res.status(200).json(
            {
                success: true,
                message: "Perfil encontrado con suceso",
                data: profile
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
    listAllUsers, updateUsers,
    deleteUsersById, myProfile
}