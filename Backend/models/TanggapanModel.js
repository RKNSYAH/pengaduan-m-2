const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");


const {DataTypes} = Sequelize;

const Tanggapan = db.define("tanggapan",{
    id_tanggapan:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey:true,
    },
    tgl_tanggapan:DataTypes.DATE,
    tanggapan:DataTypes.TEXT,
})




module.exports = Tanggapan;