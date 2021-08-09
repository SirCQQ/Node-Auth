import jwt,{Secret} from 'jsonwebtoken'
import {Response,NextFunction} from 'express'
import { IRequest } from '../interface/ValidationInterface'

function auth(req:IRequest, res:Response, next:NextFunction) {
    const token = req.header('Bearer')
    if (!token) return res.status(401).json({ message: "Access Denied" })
    try {
        const verified = jwt.verify(token,<Secret> process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (e) {
        res.status(400).json({ message: "Invalid token" })
    }
}


export default auth