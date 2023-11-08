const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Masyarakat = db.define("masyarakat",{
    nik:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    nama:DataTypes.STRING,
    username:DataTypes.STRING,
    password:DataTypes.STRING,
    telp:DataTypes.STRING,
},{freezeTableName:true})

module.exports = Masyarakat;