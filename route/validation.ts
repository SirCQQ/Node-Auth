//Validation 

import  Joi from "joi"
import {ILogin,IRegister} from '../interface/ValidationInterface'
//Register validation 


const registerValidation = (body:IRegister):Joi.ValidationResult => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required().min(6).max(1024),
        email: Joi.string().required().email()
    })
    return schema.validate(body)
}


const loginValidation = (body:ILogin):Joi.ValidationResult => {
    const schema = Joi.object({
        password: Joi.string().required().min(6).max(1024),
        email: Joi.string().required().email()
    })
    return schema.validate(body)
}


export {
    registerValidation,
    loginValidation
}