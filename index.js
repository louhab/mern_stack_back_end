import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { db } from './config.js';
import categoryRouter from './routes/categoryRoutes.js';
import ProductRouter from './routes/productRoutes.js';
import UserRouter from './routes/userRouetes.js';

import  expressListEndpoints from 'express-list-endpoints'




const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(db).then(()=>{
    app.listen(3001 , ()=>{
        console.log('App listening on : 3000')
    })
}).catch((error)=>{
    console.log(error)
})
app.use('/users' , UserRouter )
app.use('/categories' , categoryRouter )
app.use('/products' , ProductRouter )


// to get a routes available i can use : 
// const routes = expressListEndpoints(app);
// console.log(routes);
