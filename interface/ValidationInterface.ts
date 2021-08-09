import { Request } from "express"
import { IUser } from "./UserInterface"

interface ILogin{
  email:string;
  password:string;
}
interface IRegister{
  name:string;
  email:string;
  password:string;
}

interface IRequest extends Request{
  user?:any
}
export {
  ILogin,
  IRegister,
  IRequest
} 