import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoString = "mongodb+srv://mehulkumar:mehul%402401@cluster0.8qvjaia.mongodb.net/LoginR";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:"https://localhost:3000",
    credentials:true,
}))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await User.findOne({ email: email })
        if (data) {
            if (password === data.password) {
                res.status(200).json({ message: "Login Sucessfully" })
                alert("Login Sucessfully")
            } else {
                res.status(400).json({ message: "Invalid password" })
                alret("Invalid password")
            }
        } else {
            res.status(400).json({ message: "User didn't Register" })
            alret("User didn't Register")
        }
    }catch(err){
        res.status(400).json({ message: err })
    }
})


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        const data = await User.findOne({ email: email })
        if (data) {
            res.status(400).json({ message: "user already exsist" })
            alret("user already exsist")
        }
        const user = new User({
            name,
            email,
            password
        })
        await user.save()
        res.status(200).json({ message: "data saved" })

    }
    catch (err) {
        res.status(400).json({ message: err })
    }
})





app.listen(5454, () => {
    console.log("Port is Running on 5454.")
})
