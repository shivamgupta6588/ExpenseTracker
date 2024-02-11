import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
// import errorHandler from '../utils/error.js';
import jwt from'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const checkUseremail=async(req,res,next)=>{
  try {
    const { email } = req.params;
    const existingUser = await User.findOne({ email });

    res.json({ exists: !!existingUser });
  } catch (error) {
    next(error);
  }
}

export const register= async(req,res,next)=>{

   const {name,email,password}=req.body;
   const hasshedpassword=bcryptjs.hashSync(password,10);
 
   const newUser= new User({name,email,password:hasshedpassword});
    try{
      await newUser.save();

    res.status(201).json({ message: "User has been created!" })
    }catch(error)
    {
      next(error);
    }
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const validUser = await User.findOne({ email });
  
      if (!validUser) {
        return next(errorHandler(404,'User not found'));
      }
  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
  
      if (!validPassword) {
        return next(errorHandler(401,'wrong password'));
      }
  
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
  
      res.cookie("access_token", token, { httpOnly: true })
        .status(200)  
        .json(
          rest,
        );
  
    } catch (error) {
      next(error);
    }
  };
  



