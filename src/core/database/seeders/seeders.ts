
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import AlojamientoModel from '../../../entities/alojamientos/AlojamientosModel';
import UsuarioModel from '../../../entities/usuarios/UsuariosModel';
import VueloModel from '../../../entities/vuelos/VuelosModel';
import 'dotenv/config';
import { dbConnection } from "../db"

const dbUri = process.env.DB_URI || 'tu_conexion_a_mongodb';

dbConnection();

const createSeedData = async () => {
    try {
        // Eliminar datos existentes
        await UsuarioModel.deleteMany({});
        await AlojamientoModel.deleteMany({});
        await VueloModel.deleteMany({});

        // Crear un superAdmin
        const superAdmin = new UsuarioModel({
            name: 'Super',
            apellido: 'Admin',
            email: 'superadmin@example.com',
            password: bcrypt.hashSync('Super12345.', 8),
            role: 'superAdmin',
        });
        await superAdmin.save();

        // Crear 10 usuarios normales
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new UsuarioModel({
                name: faker.name.firstName(),
                apellido: faker.name.lastName(),
                email: faker.internet.email().toLowerCase(),
                password: bcrypt.hashSync('User123456.', 8),
                role: 'user',
            });
            await user.save();
            users.push(user);
        }

        // Crear 7 alojamientos
        const alojamientos = [];
        for (let i = 0; i < 7; i++) {
            const alojamiento = new AlojamientoModel({
                name: faker.company.name(),
                ciudad: faker.address.city(),
                tipo: faker.lorem.word(),
                precio: faker.datatype.number({ min: 50, max: 500 }),
            });
            await alojamiento.save();
            alojamientos.push(alojamiento);
        }

        // Crear 4 vuelos
        const vuelos = [];
        for (let i = 0; i < 4; i++) {
            const vuelo = new VueloModel({
                name: `Vuelo ${i + 1}`,
                aerolinea: faker.company.name(),
                capacidadAsiento: faker.datatype.number({ min: 100, max: 300 }),
                origen: faker.address.city(),
                destino: faker.address.city(),
                precio: faker.datatype.number({ min: 200, max: 2000 }),
                fechaIda: faker.date.future().toISOString().split('T')[0],
                horaIda: `${faker.datatype.number({ min: 0, max: 23 })}:${faker.datatype.number({ min: 0, max: 59 })}`,
                fechaRegreso: faker.date.future().toISOString().split('T')[0],
                horaRegreso: `${faker.datatype.number({ min: 0, max: 23 })}:${faker.datatype.number({ min: 0, max: 59 })}`,
                fechaRegistro: new Date(),
            });
            await vuelo.save();
            vuelos.push(vuelo);
        }

        console.log('Datos insertados correctamente');
    } catch (error) {
        console.error('Error al generar datos de prueba:', error);
    } finally {
        mongoose.connection.close();
    }
};

createSeedData();
