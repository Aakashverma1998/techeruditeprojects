const db = require("../models")
const bcrypt = require("bcryptjs")
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken")
const Admin = db.admin

const register = async(body)=>{
    try{
        const existAdmin = await Admin.findOne({where:{email:body.email}})
        if(existAdmin){
            return ({status:400, message:"Admin already exist."})
        }
        const hashedPassword = await bcrypt.hash(body.password,10)
        let info = {
            firstName: body.firstName,
            lastName : body.lastName,
            email : body.email,
            password : hashedPassword
        }
        const data = await Admin.create(info)
        delete data.password
        return data
    }catch(err){
        return err
    }
}

const login = async (body) => {
    try {
        let admin = await Admin.findOne({where:{
            email: body.email, isEmailVerified:true
        }});
        if(!admin){
            return ({message:"Please verify mail."})
        }
        if (admin) {
            let passwordMatch = await bcrypt.compare(body.password, admin.password);
            if (passwordMatch) {
                let token = jwt.sign({
                    id: admin.id
                }, process.env.secret_key, {
                    expiresIn: "1h"
                })
                return({
                    message: "Login Success",
                    data: admin,
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

const getAllAdmin = async()=>{
    try{
        const data = await Admin.findAll({where:{isDeleted:false}})
        if(!data){
            return ({status:400, message: "admin not found"})
        }
        return data
    }catch(err){
        return err
    }
}

const getAdminById = async(id)=>{
    try{
        const data = await Admin.findOne({where:{id:id,isDeleted:false}})
        if(!data){
            return ({status:400, message: "admin not found"})
        }
        return data
    }catch(err){
        return err
    }
}

const update = async(body,id)=>{
    try{
        const data = await Admin.update(body,{where:{id:id}})
        if(!data){
            return ({status:400, message: "Admin not found"})
        }
        return data
    }catch(err){
        return err
    }
}

const deleteAdmin = async(id)=>{
    try{
        const data = await Admin.update({isDeleted:true},{where:{id:id}})
        if(!data){
            return ({status:400, message: "Admin not found"})
        }
        return data
    }catch(err){
        return err
    }
}

const generateMailOtp = async(body)=>{
    try{
        const emailOtp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        let admin = await Admin.findOne({where:{
            email: body.email
        }});
        if(!admin){
            return ({status:400, message: "Admin not found"})
        }
        await Admin.update({otp:emailOtp},{where:{id:admin.id}})
        return ({message:"otp sent successfully"})

    }catch(err){
        return err
    }
}

const verifyEmailOtp = async(body)=>{
    try {
        const admin = await Admin.findOne({ where: { otp: body.otp } });
        if (admin) {
            await admin.update({ isEmailVerified: true, otp: null });
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
    getAllAdmin,
    getAdminById,
    update,
    generateMailOtp,
    deleteAdmin,
    verifyEmailOtp
}