import exp from 'express'
import { ArticleModel } from '../models/ArticleModel.js'
import { UserTypeModel } from '../models/UserModel.js'
import { authenticate } from '../services/authService.js'

export const adminRoute = exp.Router()

// Authenticate admin
adminRoute.post("/authenticate", async (req,res)=>{
    let adminCred = req.body

    let newadminObj = await UserTypeModel.findOne({email:adminCred.email})

    if(!newadminObj){
        return res.status(401).json({message:"Invalid email"})
    }

    if(newadminObj.role !== "ADMIN"){
        return res.status(404).json({message:"User is not an admin"})
    }

    if(!newadminObj.isActive){
        return res.status(403).json({message:"Admin account is not active"})
    }

    let {token,user} = await authenticate(adminCred)

    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })

    res.status(200).json({message:"Login Successful",payload:user})
})


//  Read all articles
adminRoute.get("/articles", async(req,res)=>{
    let articles = await ArticleModel.find()
    res.status(200).json({
        message:"Here are all articles",
        payload:articles
    })
})


//  Block / Unblock user
adminRoute.put("/users/:userId", async(req,res)=>{
    let userId = req.params.userId

    let userObjDb = await UserTypeModel.findById(userId)

    if(!userObjDb){
        return res.status(404).json({message:"User Not Found"})
    }

    userObjDb.isActive = !userObjDb.isActive
    await userObjDb.save()

    res.status(200).json({
        message:"User status updated",
        payload:userObjDb
    })
})


