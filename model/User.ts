import { Schema, model,models} from "mongoose";
import {IUserDoc} from '../interface/UserInterface'

const userSchema=new Schema<IUserDoc>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }

})

export default models.User|| model("User",userSchema)