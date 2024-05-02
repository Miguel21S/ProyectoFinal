
import { Request, Response } from "express";
import VueloModel from "./VuelosModel";
import UsuarioModel from "../usuarios/UsuariosModel";

//////////////////////   MÉTODO ADICIONAR VUELO   /////////////////////////
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

//////////////////////   MÉTODO ACTUALIZAR VUELO   /////////////////////////
const actualizarVuelo = async (req: Request, res: Response) =>{
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const idVuelo = req.body._id;
        const name = req.body.name;
        const aerolinea = req.body.aerolinea;
        const origen = req.body.origen;
        const destino = req.body.destino;
        const precio = req.body.precio;
        const fechaIda = req.body.fechaIda;
        const horaIda = req.body.horaIda;
        const fechaRegreso = req.body.fechaRegreso;
        const horaRegreso = req.body.horaRegreso;       

        const usuario = await UsuarioModel.findOne({_id: usuarioAdmin});
        if(!usuario){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }

        if(usuario.role !== "superAdmin"){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado",
            }) 
        }

        const vuelo = await VueloModel.findById({ _id: idVuelo});
        if(!vuelo){
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado",
            }) 
        }
        
        await VueloModel.findByIdAndUpdate(
            {
                _id:idVuelo
            },
            {
                name: name,
                aerolinea: aerolinea,
                origen: origen,
                destino: destino,
                precio: precio,
                fechaIda: fechaIda,
                horaIda: horaIda,
                fechaRegreso: fechaRegreso,
                horaRegreso: horaRegreso, 
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
const eliminarVuelo = async (req: Request, res: Response) =>{
    try {
        const usuarioAdmin = req.tokenData.usuarioId;
        const vueloId = req.params.id;

        const usuario = await UsuarioModel.findOne({_id: usuarioAdmin});
        if(!usuario){
            return res.status(404).json({
                success: false,
                message: "Usuario autorizado no encontrado"
            })
        }
        
        if(usuario.role  !== "superAdmin"){
            return res.status(404).json({
                success: false,
                messages: "Usuario no autorizado"
            })
        }

        const vuelo = await VueloModel.findById({ _id: vueloId });
        console.log(vuelo)
        if(!vuelo){
            return res.status(404).json({
                success: false,
                message: "Vuelo no encontrado"
            })
        }
        
        await VueloModel.findByIdAndDelete( vueloId );

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
    adicionarVuelo, listarVuelos, actualizarVuelo,
    eliminarVuelo
}