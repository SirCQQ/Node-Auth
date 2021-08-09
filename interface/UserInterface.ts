import {Document} from "mongoose"

interface IUser{
  name?:string;
  email?:string;
  password?:string;
  date?:Date;
}

interface IUserDoc extends Document,IUser{

}

export {
  IUser,
  IUserDoc
}