import { Number } from "mongoose";

export type TokenData = {
    userId: Number,
    UserRole: string
}

declare global {
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}