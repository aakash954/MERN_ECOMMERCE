import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js';
import bodyParser from 'express'
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
import paymentRouter from './Routes/payment.js';
import cors from 'cors';
const app = express();
app.use(bodyParser.json())

app.use(cors({
  origin:true,
  methods:["GET","POST","DELETE","PUT"],
  credentials:true
}))

//home testing route
app.get('/', (req, res) => res.json({ message:'this is home route'}));

//user Router
app.use('/api/user',userRouter)

//product Router
app.use('/api/product',productRouter)

//address Router
app.use('/api/address',addressRouter)

//cart router
app.use('/api/cart',cartRouter)

// payment Router
app.use('/api/payment',paymentRouter)

mongoose.connect(
  "mongodb+srv://az418613:XOaYfXpiIm8jCkFo@cluster0.c4adk8v.mongodb.net/",{
    dbName: "E_COMMERCE"
  }
)
.then(() => console.log("MongoDB is connected successfully...!"))
.catch((err) => console.log(err));

const port = 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
