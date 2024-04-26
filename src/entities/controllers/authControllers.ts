import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UsuarioModel from "../usuarios/UsuariosModel";

export const registrar = async (req: Request, res: Response) => {
    try {
        const nombre = req.body.nombre;
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
        if(!validPwd.test(password)){
            return res.status(404).json({
                success: false,
                message: "La clave de tener pelo menos 1 número, caracter especial, letra mayuscula, y minuscula "
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
        const crearNuevoUser = await UsuarioModel.create(
            {
                nombre: nombre,
                email: email,
                password: pwdEncryptado
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Usuario creado con suceso",
                data: crearNuevoUser
            }
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Problema al registrar usuario"
        })

    }
}
