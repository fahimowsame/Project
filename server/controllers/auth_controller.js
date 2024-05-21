import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const register = async (req, res) => {
    try{
        const {username, email, password} = req.body
        const hasPassword = await bcrypt.hash(password, 10 )
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password : hasPassword,
            }
        })
        console.log(newUser);
        res.status(201).json({message: "User created successfully.", user: newUser})
        
    }catch(err){
        res.status(500).json({message: 'Internal server error', error: err})
    }
    
}
export const login = async (req, res) => {
    //db operation
    const {username, password} = req.body
    try {
        // check if the user exist
        const user = await prisma.user.findUnique({
            where : {username }
        })

        if(!user) return res.status(401).json({message : "Invalied Credential"})
        //check if the password is correct
        const isPasswordvalied = await bcrypt.compare(password, user.password);

        if(!isPasswordvalied) return res.status(401).json({message : "Invalied Credential"})
        // generate cookie token and send to the user

        // res.setHeader("set-Cookie", "test=" + "myvalue").json("success")
        const age = 1000 * 60 * 60 * 24 * 7

        const  token = jwt.sign(
            {
                id : user.id,
                isAdmin : false,
            }, 
            process.env.JWT_SECRET_KEY,
            {expiresIn : age}
        )

        const {password : userpassword, ...userInfo} = user

        
        res.cookie("token", token, {
            httpOnly : true,
            maxAge : age,
            // secure : true {in production mode make sure that the secure is true}
        }).status(200).json(userInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Failed to Login"})
    }
    

}
export const logout =  (req, res) => {
    try {
        // Check if the token cookie exists
        // if(!req.cookies.token){
        //     return res.status(401).json({message: "You have already logged out from the application."});
        // }
        // Clear the token cookie
        res.clearCookie("token").status(200).json({ message: "Logout Successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Failed to logout" });
    }
}

