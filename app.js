const express = require("express")
const app = express()
const customerRoute = require("./routes/customerRoute")
const adminRoute = require("./routes/adminRoute")
const port = process.env.port || 8000

app.use(express.json())
app.use("/api/v1/customer",customerRoute)
app.use("/api/v1/admin",adminRoute)
app.get("/healthCheck", (req, res) => {
    res.send({ "status": 200 })
})
app.listen(port, () => { console.log(`server is running on port ${port}`) })