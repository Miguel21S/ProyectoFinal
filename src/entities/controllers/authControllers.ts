import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersModel from "../users/UsersModel";

const register = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;

        if (password.length < 8) {
            return res.status(404).json({
                success: false,
                message: "La clave debe tener mas de 7 caracter"
            })
        }

        // VALIDACIÓN DE PASSWORD
        const validPwd = /^(?=.*\d)(?=.*[!\"#\$%&'()*+,-./:;<=>?@[\\\]^_])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/
        if (!validPwd.test(password)) {
            return res.status(404).json({
                success: false,
                message: "La clave de tener pelo menos un número, un caracter especial, un letra mayuscula, y minuscula "
            })
        }

        // VALIDACIÓN DEL EMAIL
        const validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "invalid email format"
                }
            )
        }

        // ENCRIPTACIÓN DEL PASSWORD
        const pwdEncryptado = bcrypt.hashSync(password, 8);
        const createNewUser = await UsersModel.create(
            {
                name: name,
                lastName: lastName,
                email: email,
                password: pwdEncryptado
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Usuario creado con suceso",
                data: createNewUser
            }
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Problema al registrar usuario"
        })

    }
}

const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UsersModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Dato incorrecto de usuario"
            })
        }
        /////////   VALIDAR PASSWORD   //////////
        const validaterpw = bcrypt.compareSync(password, user!.password);
        if (!validaterpw) {
            return res.status(404).json({
                success: false,
                message: "Dato incorrecto password"
            })
        }

        ///////////////   CREACIÓN DEL TOKEN   ////////////////////
        const token = jwt.sign(
            {
                name: user.name,
                email: email.email,
                userId: user._id,
                userRole: user.role
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "5h"
            }
        )

        res.status(200).json({
            success: true,
            message: "Logueado con suceso",
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al loguearse"
        })
    }
}

export{
    register, login
}