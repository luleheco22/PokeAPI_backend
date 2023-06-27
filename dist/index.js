"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)(); //Conexion a la base de datos
//Middlewares
app.use(express_1.default.json()); //middleware que transforma la req.body a un json
app.use((0, morgan_1.default)('dev')); // Mostrar peticiones
app.use((0, cors_1.default)()); // Habilitar cors
app.use(express_1.default.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3001;
//Rutas de la app
app.use('/users', userRoute_1.default);
app.use('/auth', authRoute_1.default);
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
