const {registerCustomer,getAllCustomers,updateCustomer,getCustomerbyId,deleteCustomerById,loginCustomer,generateOtp,verifyemailOtp}  = require("../controller/customerController")
const router = require("express").Router()

router.post("/register", registerCustomer)
router.post("/login", loginCustomer)
router.post("/generateOtp",generateOtp )
router.post("/verifyEmailOtp",verifyemailOtp)
router.get("/getAllCustomer", getAllCustomers)
router.get("/getCustomerById/:id", getCustomerbyId)
router.post("/updateCustomerById/:id", updateCustomer)
router.delete("/deleteCustomer/:id", deleteCustomerById)

module.exports = router