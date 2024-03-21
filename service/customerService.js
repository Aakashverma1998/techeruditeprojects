const db = require("../models")
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const Customer = db.customer

const register = async(body)=>{
    try{
        const existCustomer = await Customer.findOne({where:{email:body.email}})
        if(existCustomer){
            return ({status:400,message:"Customer already exist."})
        }
        const hashedPassword = await bcrypt.hash(body.password,10)
        let info = {
            firstName: body.firstName,
            lastName : body.lastName,
            email : body.email,
            password : hashedPassword
        }
        const data = await Customer.create(info)
        return data
    }catch(err){
        return err
    }
}

const login = async (body) => {
    try {
        let customer = await Customer.findOne({where:{
            email: body.email, isEmailVerified:true
        }});
        if(!customer){
            return ({message:"Please verify mail."})
        }
        if (customer) {
            let passwordMatch = await bcrypt.compare(body.password, customer.password);
            if (passwordMatch) {
                let token = jwt.sign({
                    id: customer.id
                }, process.env.secret_key, {
                    expiresIn: "1h"
                })
                return({
                    message: "Login Success",
                    data: customer,
                    token

                });
            } else {
                return ({status:400,message:"Unable to login"});
            };
        } else {
            return ({status:400,message:"Unable to login"});
        };
    } catch (err) {
        return err

    };
}

const getAllCustomer = async()=>{
    try{
        const data = await Customer.findAll({where:{isDeleted:false}})
        if(!data){
            return ({status:400,message: "customer not found"})
        }
        return data
    }catch(err){
        return err
    }   
}

const getCustomerById = async(id)=>{
    try{
        const data = await Customer.findOne({where:{id:id, isDeleted:false}})
        if(!data){
            return ({status:400,message: "customer not found"})
        }
        return data
    }catch(err){
        return err
    }
}

const update = async(body,id)=>{
    try{
        const data = await Customer.update(body,{where:{id:id}})
        if(!data){
            return ({status:400,message: "customer not found"})
        }
        return data
    }catch(err){
        return err
    }
}

const deleteCustomer = async(id)=>{
    try{
        const data = await Customer.update({isDeleted:true},{where:{id:id}})
        if(!data){
            return ({status:400, message: "customer not found"})
        }
        return data
    }catch(err){
        return err
    }
}
const generateMailOtp = async(body)=>{
    try{
        const emailOtp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        let customer = await Customer.findOne({where:{
            email: body.email
        }});
        if(!customer){
            return ({status:400, message: "Customer not found"})
        }
        await Customer.update({otp:emailOtp},{where:{id:customer.id}})
        return ({message:"otp sent successfully"})

    }catch(err){
        return err
    }
}

const verifyEmail = async(body)=>{
    try {
        const customer = await Customer.findOne({ where: { otp: body.otp } });
        if (customer) {
            await Customer.update({ isEmailVerified: true, otp: null },{ where: { id: customer.id } });
            return { message: "Email verified successfully" };
        } else {
            return { message: "Invalid OTP" };
        }
    }catch(err){
        return err
    }
}

module.exports = {
    register,
    login,
    getAllCustomer,
    getCustomerById,
    update,
    deleteCustomer,
    generateMailOtp,
    verifyEmail
}