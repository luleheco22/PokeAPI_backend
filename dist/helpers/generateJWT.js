"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'variables.env' });
const createJWT = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.username }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};
exports.default = createJWT;
