const { Sequelize } = require("sequelize");

const db = new Sequelize("pengaduan_rakhansyah","root","",{
    host:"localhost",
    dialect:"mysql",
})

module.exports = db;