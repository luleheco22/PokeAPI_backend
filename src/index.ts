import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';


const app=express()
dotenv.config()

connectDB() //Conexion a la base de datos

//Middlewares
app.use(express.json()) //middleware que transforma la req.body a un json
app.use(morgan('dev')); // Mostrar peticiones

app.use(cors()); // Habilitar cors
app.use(express.urlencoded({extended: false}));

const PORT= process.env.PORT || 3001;

//Rutas de la app
app.use('/users', userRoute);
app.use('/auth', authRoute);

const server=app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})