import { Request, Response } from "express";
import VueloModel from "./VuelosModel";


const adicionarVuelo = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const aerolinea = req.body.aerolinea;
        const origen = req.body.origen;
        const destino = req.body.destino;
        const precio = req.body.precio;
        const fechaIda = req.body.fechaIda;
        const horaIda = req.body.horaIda;
        const fechaRegreso = req.body.fechaRegreso;
        const horaRegreso = req.body.horaRegreso;

        const vueloAdicionado = await VueloModel.create({
            name: name,
            aerolinea: aerolinea,
            origen: origen,
            destino: destino,
            precio: precio,
            fechaIda: fechaIda,
            horaIda: horaIda,
            fechaRegreso: fechaRegreso,
            horaRegreso: horaRegreso,
        })

        res.status(200).json(
            {
                success: true,
                message: "Vuelo adicionado con suceso",
                data: vueloAdicionado
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en adicionar vuelo"
            }
        )
    }
}

const listarVuelos = async (req: Request, res: Response) => {
    try {
        const vuelos = await VueloModel.find()
        .select("name")
        .select("aerolinea")
        .select("origen")
        .select("destino")
        .select("fechaIda")
        .select("horaIda")
        .select("fechaRegreso")
        .select("horaRegreso")
        .select("precio")

        res.status(200).json(
            {
                success: true,
                message: "Lista de vuelos",
                data: vuelos
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en listar vuelos"
            }
        )
    }
}

export {
    adicionarVuelo, listarVuelos
}