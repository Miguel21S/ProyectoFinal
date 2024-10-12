
import { Request, Response } from "express";
import FlightsModel from "./FlightsModel";
import UsersModel from "../users/UsersModel";

//////////////////////   MÉTODO ADICIONAR VUELO   /////////////////////////
const addFlights = async (req: Request, res: Response) => {
    try {
        const {
                name, airline,seatcapacity, country, origin, destination,
                price, dateDeparture, timeGoTime, dateReturn, timeReturn
            } = req.body;
       

        const flightAdd = await FlightsModel.create({
            name: name,
            airline: airline,
            seatcapacity: seatcapacity,
            country: country,
            origin: origin,
            destination: destination,
            price: price,
            dateDeparture: dateDeparture,
            timeGoTime: timeGoTime,
            dateReturn: dateReturn,
            timeReturn: timeReturn,
        })

        res.status(200).json(
            {
                success: true,
                message: "Vuelo adicionado con suceso",
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

//////////////////////   MÉTODO LISTAR VUELOS  /////////////////////////
const listFlights = async (req: Request, res: Response) => {
    try {
        const flights = await FlightsModel.find()
        .select("name")
        .select("airline")
        .select("seatcapacity")
        .select("country")
        .select("origin")
        .select("destination")
        .select("dateDeparture")
        .select("timeGoTime")
        .select("dateReturn")
        .select("timeReturn")
        .select("price")

        res.status(200).json(
            {
                success: true,
                message: "Lista de vuelos",
                data: flights
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

//////////////////////   MÉTODO ACTUALIZAR VUELO   /////////////////////////
const updateFlights = async (req: Request, res: Response) =>{
    try {
        const userAdmin = req.tokenData.userId;
        const idFlight = req.params.id;
        const { 
            name, airline,seatcapacity, country, origin, destination,
            price, dateDeparture, timeGoTime, dateReturn, timeReturn
        } = req.body;
          

        const user = await UsersModel.findOne({_id: userAdmin});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        if(user.role !== "superAdmin"){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado",
            }) 
        }

        const flight = await FlightsModel.findById({ _id: idFlight});
        if(!flight){
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado",
            }) 
        }
        
        await FlightsModel.findByIdAndUpdate(
            {
                _id:idFlight
            },
            {                
                name: name,
                seatcapacity: seatcapacity,
                airline: airline,
                country: country,
                origin: origin,
                destination: destination,
                price: price,
                dateDeparture: dateDeparture,
                timeGoTime: timeGoTime,
                dateReturn: dateReturn,
                timeReturn: timeReturn,
            },
            {
                new: true
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Vuelo actualizado con suceso"
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error en actualizar vuelos"
            }
        )
    }
}

//////////////////////   MÉTODO ELIMINAR VUELO POR ID   /////////////////////////
const deleteFlights = async (req: Request, res: Response) =>{
    try {
        const userAdmin = req.tokenData.userId;
        const idFlight = req.params.id;

        const user = await UsersModel.findOne({_id: userAdmin});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }
        
        if(user.role  !== "superAdmin"){
            return res.status(404).json({
                success: false,
                messages: "Usuario no autorizado"
            })
        }

        const flight = await FlightsModel.findById({ _id: idFlight });
        if(!flight){
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado"
            })
        }
        
        await FlightsModel.findByIdAndDelete( idFlight );

        res.status(200).json({
            success: true,
            message: "Vuelo eliminado con suceso"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar vuelo"
        })
    }
}

export {
    addFlights, listFlights, updateFlights,
    deleteFlights
}