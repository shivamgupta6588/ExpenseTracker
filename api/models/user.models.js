import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,"name is required"],
    },
    email:{
        type: String,
        required:[true,"email is required"],
        unique:true,
    },
    password:{
        type: String,
        required:[true,"password is required"],
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
    },
    
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;