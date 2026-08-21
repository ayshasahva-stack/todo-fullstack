import express from 'express';
import errorHandler from './middleware/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
import morgan from 'morgan';



const app = express();


app.use(express.json());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}



app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);


app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"not found"
    })
})

app.use(errorHandler);



export default app;