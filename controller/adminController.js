const {register,getAllAdmin,getAdminById,deleteAdmin,update, login, generateMailOtp,verifyEmailOtp} = require("../service/adminService")


const registerAdmin = async(req,res)=>{
    try{
        const data = await register(req.body)
        res.send(data)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

const loginAdmin = async(req,res)=>{
    try{
        const data = await login(req.body)
        res.send(data)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

const getAllAdmins = async(req,res)=>{
    try{
        const data = await getAllAdmin({})
        res.send(data)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

const getAdminbyId = async(req,res)=>{
    try{
        const data = await getAdminById(req.params.id)
        res.send(data)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

const updateAdmin = async(req,res)=>{
    try{
        const data = await update(req.body, req.params.id)
        res.send(data)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

const deleteAdminById = async(req,res)=>{
    try{
        const data = await deleteAdmin(req.params.id)
        res.send(data)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

const generateOtp = async(req,res)=>{
    try{
        const verify = await generateMailOtp(req.body)
        res.send(verify)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}
const verifyemailOtp = async(req,res)=>{
    try{
        const verifyOtp = await verifyEmailOtp(req.body)
        res.send(verifyOtp)
    }catch(err){

    }
}

module.exports ={
    registerAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminbyId,
    updateAdmin,
    deleteAdminById,
    generateOtp,
    verifyemailOtp
}