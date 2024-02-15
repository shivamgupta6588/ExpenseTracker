  import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import morgan from 'morgan';
  import mongoose from 'mongoose';
  import colors from 'colors';
  import userRouter from './routes/user.routes.js';
  import transactionRouter from './routes/transaction.routes.js';
  import path from 'path';
  import cookieParser from 'cookie-parser';
  dotenv.config();

  // Create express app
  const app = express();

  const _dirname= path.resolve();
  mongoose.connect(process.env.MONGODB_URI, 
  ).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  // Middlewares
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.use('/api/users',userRouter);
  app.use('/api/transaction',transactionRouter)

  // Port configuration
  const port = process.env.PORT ;

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  app.use(express.static(path.join(_dirname,'/client/dist')));

  app.get('*',(req,res)=>{
      res.sendFile(path.join(_dirname,'client','dist','index.html'));
  })
  
  app.use((err,req,res,next)=>{
      const statuscode=err.statusCode||500;
      const message=err.message||'Internal Server Error';
  
      return res.status(statuscode).json({
          success:false,
          statuscode,
          message
      });
  });


