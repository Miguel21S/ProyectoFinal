import { Number } from "mongoose";

export type TokenData = {
    usuarioId: Number,
    UsuarioRole: string
}

declare global {
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}