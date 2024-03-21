const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();
const Customer = require("../models/customerModel")
const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace("Bearer ","")
        const decoded = jwt.verify(token,process.env.secret_key)
        const customer = await Customer.findOne({id:decoded.id})
        if(!customer){
            throw new Error()
        }
        // req.token = token
        req.user = customer
        next()
    }catch(err){
        return res.status(401).json({"error":"Please authenticate"})

    }
   
}


module.exports = auth