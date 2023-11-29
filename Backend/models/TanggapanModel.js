const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");


const {DataTypes} = Sequelize;

const Tanggapan = db.define("tanggapan",{
    id_tanggapan:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    tgl_tanggapan:{ type: DataTypes.DATE, defaultValue: Sequelize.NOW() },
    tanggapan:DataTypes.TEXT,
    id_pengaduan: DataTypes.UUID,
    id_petugas: DataTypes.UUID
})




module.exports = Tanggapan;