"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const users_1 = __importDefault(require("../models/users"));
const express_validator_1 = require("express-validator");
const newUser = async (req, res) => {
    // Mostrar mensajes de error de express validator
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Verificar si existe un usuario
    const { email } = req.body;
    let user = await users_1.default.findOne({ email });
    if (user) {
        return res.json({ msg: 'Usuario ya existe', create: false });
    }
    user = new users_1.default(req.body);
    user.save();
    res.json({ msg: 'Usuario creado', create: true });
};
exports.newUser = newUser;
