const {registerAdmin,getAdminbyId,getAllAdmins,updateAdmin,deleteAdminById, loginAdmin, generateOtp,verifyemailOtp}  = require("../controller/adminController")
const router = require("express").Router()

router.post("/register", registerAdmin)
router.post("/login", loginAdmin)
router.post("/generateOtp",generateOtp )
router.post("/verifyEmailOtp",verifyemailOtp)
router.get("/getAllAdmin", getAllAdmins)
router.get("/getAdminById/:id", getAdminbyId)
router.post("/updateAdminById/:id", updateAdmin)
router.delete("/deleteAdmin/:id", deleteAdminById)

module.exports = router