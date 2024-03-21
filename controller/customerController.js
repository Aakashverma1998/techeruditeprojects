const { register, getAllCustomer, getCustomerById, deleteCustomer, update,verifyEmail ,generateMailOtp, login} = require("../service/customerService")


const registerCustomer = async (req, res) => {
    try {
        const data = await register(req.body)
        res.send(data)
    } catch (err) {
        res.status(500).send("Internal server error");
    }
}

const loginCustomer = async(req,res)=>{
    try{
        const data = await login(req.body)
        res.send(data)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const data = await getAllCustomer({})
        res.send(data)
    } catch (err) {
        res.status(500).send("Internal server error")
    }
}

const getCustomerbyId = async (req, res) => {
    try {
        const data = await getCustomerById(req.params.id)
        res.send(data)
    } catch (err) {
        res.status(500).send("Internal server error")
    }
}

const updateCustomer = async (req, res) => {
    try {
        const data = await update(req.body, req.params.id)
        res.send(data)
    } catch (err) {
        res.status(500).send("Internal server error")
    }
}

const deleteCustomerById = async (req, res) => {
    try {
        const data = await deleteCustomer(req.params.id)
        res.send(data)
    } catch (err) {
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
        const verifyOtp = await verifyEmail(req.body)
        res.send(verifyOtp)
    }catch(err){
        res.status(500).send("Internal server error")
    }
}

module.exports = {
    registerCustomer,
    getAllCustomers,
    getCustomerbyId,
    updateCustomer,
    deleteCustomerById,
    generateOtp,
    loginCustomer,
    verifyemailOtp
}