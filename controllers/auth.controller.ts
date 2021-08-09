import { registerValidation, loginValidation } from "../route/validation"
import User from "../model/User"
import bcrypt from "bcryptjs"
import jwt,{Secret} from "jsonwebtoken"
import {Request,Response} from 'express'
class AuthController {

  static async registerUser(req:Request, res:Response) {
    //Validate
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })
    console.log('register')

    //Check for user 
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json({ error: "Email already exists" })
    console.log(emailExists)
    // Hasing the password 
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    //Create a new user 
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    })
    //Saving into database
    try {
      const savedUser = await user.save()
      return res.json({ user: savedUser._id })
    }
    //Catching any errors
    catch (e) {
      return res.status(400).send(e)
    }
  }


  static async login(req:Request, res:Response) {
    //Validate
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message })

    //Check for user 
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: "Email ''or Password ''is wrong" })

    //Password is correct 
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ error: "''Email or'' Password is wrong" })

    //Create and asign a token
    const token = jwt.sign({ _id: user._id }, <Secret>process.env.TOKEN_SECRET)
    return res.header("auth-token", token).json({ message: "success", jwt: token })
  }

}


export default AuthController

