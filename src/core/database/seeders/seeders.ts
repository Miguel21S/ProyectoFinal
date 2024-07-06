
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import AccommodationsModel from '../../../entities/accommodation/AccommodationsModel';
import UsersModel from '../../../entities/users/UsersModel';
import FlightsModel from '../../../entities/flights/FlightsModel';
import 'dotenv/config';
import { dbConnection } from "../db"

const dbUri = process.env.DB_URI || 'tu_conexion_a_mongodb';

dbConnection();

const createSeedData = async () => {
    try {
        // Eliminar datos existentes
        await UsersModel.deleteMany({});
        await AccommodationsModel.deleteMany({});
        await FlightsModel.deleteMany({});

        // Crear un superAdmin
        const superAdmin = new UsersModel({
            name: 'Miguel',
            lastName: 'SuperAdmin',
            email: 'miguel@gmail.com',
            password: bcrypt.hashSync('Miguel.1234', 8),
            role: 'superAdmin',
        });
        await superAdmin.save();

        // Crear 10 usuarios normales
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new UsersModel({
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email().toLowerCase(),
                password: bcrypt.hashSync('User1234.', 8),
                role: 'user',
            });
            await user.save();
            users.push(user);
        }

        // Crear 7 alojamientos
        const accommodations = [];
        for (let i = 0; i < 7; i++) {
            const accommodation = new AccommodationsModel({
                name: faker.company.name(),
                city: faker.address.city(),
                kinds: faker.lorem.word(),
                price: faker.datatype.number({ min: 50, max: 500 }),
            });
            await accommodation.save();
            accommodations.push(accommodation);
        }

        // Crear 4 vuelos
        const flights = [];
        for (let i = 0; i < 4; i++) {
            const flight = new FlightsModel({
                name: `Vuelo ${i + 1}`,
                airline: faker.company.name(),
                seatcapacity: faker.datatype.number({ min: 100, max: 300 }),
                origin: faker.address.city(),
                destination: faker.address.city(),
                price: faker.datatype.number({ min: 200, max: 2000 }),
                dateDeparture: faker.date.future().toISOString().split('T')[0],
                timeGoTime: `${faker.datatype.number({ min: 0, max: 23 })}:${faker.datatype.number({ min: 0, max: 59 })}`,
                dateReturn: faker.date.future().toISOString().split('T')[0],
                timeReturn: `${faker.datatype.number({ min: 0, max: 23 })}:${faker.datatype.number({ min: 0, max: 59 })}`,
                dateRecord: new Date(),
            });
            await flight.save();
            flights.push(flight);
        }

        console.log('Datos insertados correctamente');
    } catch (error) {
        console.error('Error al generar datos de prueba:', error);
    } finally {
        mongoose.connection.close();
    }
};

createSeedData();
