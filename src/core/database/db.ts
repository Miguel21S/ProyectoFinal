import mongoose from "mongoose";

export const dbConnection = () => {
    const mongURI = process.env.MONGO_URI;

    if( !mongURI ){
        throw new Error("MONGO_URI not found ");
    }

    return mongoose.connect(
        mongURI,
        {}
    );
}