"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthenticate = exports.authenticateUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const express_validator_1 = require("express-validator");
const generateJWT_1 = __importDefault(require("../helpers/generateJWT"));
const authenticateUser = async (req, res, next) => {
    //Revisar si hay errores
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;
    const user = await users_1.default.findOne({ email });
    if (!user) {
        res.json({ msg: 'El usuario no existe', login: false });
        return next();
    }
    // Verificar el password y autenticar el usuario
    //Comprobar su password
    if (await user?.comparePassword(password)) {
        //Retorna todos los datos del usuario , el token y un booleano para validar que logueo correctamente
        return res.json({
            ...user?.toJSON(),
            token: (0, generateJWT_1.default)(user),
            login: true
        });
    }
    return res.json({ msg: "The password is wrong", login: false });
};
exports.authenticateUser = authenticateUser;
const userAuthenticate = async (req, res, next) => {
    res.json({ user: req.user });
};
exports.userAuthenticate = userAuthenticate;
