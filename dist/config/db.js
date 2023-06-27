"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'variables.env' });
const connectDB = async () => {
    try {
        const connection = await mongoose_1.default.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Conectado en ${url} `);
    }
    catch (error) {
        console.log(error);
        console.log('Hubo un error');
        process.exit(1);
    }
};
exports.default = connectDB;
