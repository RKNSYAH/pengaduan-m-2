const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const Route = require("./routes/Route.js");
const db = require("./config/Database.js");
require('dotenv').config()
const app = express()
const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))
app.use(Route) 
db.sync()
app.listen(PORT,() => console.log(`serve berjalan di http://localhost:${PORT}`))