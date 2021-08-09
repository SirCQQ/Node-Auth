import express from "express"
import router from "./route/auth"
import mogoose from "mongoose"
import dotenv from "dotenv"

let app = express()
const PORT = process.env.PORT || 3000
dotenv.config()
//Connect to db 

mogoose.connect(<string>process.env.DB_URL,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log("Connected to database")
    })

app.use(express.json())

app.use('/api/user', router)
app.listen(PORT, () => {
    console.log(`Server starts at http://localhost:${PORT}`)
})