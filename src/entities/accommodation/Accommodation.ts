
import { Request, Response } from "express";
import UsersModel from "../users/UsersModel";
import AccommodationsModel from "./AccommodationsModel";

//////////////////////   MÉTODO CREAR ALOJAMIENTO  /////////////////////////
const createAccommodation = async (req: Request, res: Response) => {
    try {
        const userAdmin = req.tokenData.userId;
        const price = req.body.price;
        const { name, city, kinds } = req.body

        const user = await UsersModel.findOne({ _id: userAdmin });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        if (user.role !== "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "Usuario no autorizado"
            })
        }

        await AccommodationsModel.create({
            name: name,
            city: city,
            kinds: kinds,
            price: price
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
const listAccommodation = async (req: Request, res: Response) => {
    try {
        const accommodation = await AccommodationsModel.find()
            .select("name")
            .select("city")
            .select("kinds")
            .select("price")

        res.status(200).json(
            {
                success: true,
                message: "Lista de alojamientos",
                data: accommodation
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
const updateAccommodation = async (req: Request, res: Response) => {
    try {
        const userAdmin = req.tokenData.userId;
        const accommodationId = req.params.id;
        const { name, city, kinds, price} = req.body;

        const user = await UsersModel.findOne({ _id: userAdmin });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        if (user.role !== "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "Usuario no autorizado"
            })
        }

        const accommodation = await AccommodationsModel.findOne({ _id: accommodationId });
        if (!accommodation) {
            return res.status(404).json({
                success: false,
                message: "No se pudo encontrar alojamiento"
            })
        }

        await AccommodationsModel.findByIdAndUpdate(
            {
                _id: accommodationId
            },
            {
                name: name,
                city: city,
                kinds: kinds,
                price: price
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
const deleteAccommodation = async (req: Request, res: Response) => {
    try {
        const userAdmin = req.tokenData.userId;
        const accommodationId = req.params.id;

        const user = await UsersModel.findOne({ _id: userAdmin });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        if (user.role !== "superAdmin") {
            return res.status(404).json({
                success: false,
                messages: "Usuario no autorizado"
            })
        }

        const accommodation = await AccommodationsModel.findOne({ _id: accommodationId });
        if (!accommodation) {
            return res.status(404).json({
                success: false,
                message: "No se pudo encontrar alojamiento"
            })
        }

        await AccommodationsModel.findByIdAndDelete(updateAccommodation);
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
    createAccommodation, listAccommodation,
    deleteAccommodation, updateAccommodation
}