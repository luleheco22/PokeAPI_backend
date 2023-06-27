"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'variables.env' });
const auth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        // Obtener el token
        const token = authHeader.split(' ')[1];
        // Comprobar el JWT 
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = user;
        }
        catch (error) {
            console.log(error);
            res.json({ msg: 'Token no valido' });
        }
    }
    return next();
};
exports.default = auth;
