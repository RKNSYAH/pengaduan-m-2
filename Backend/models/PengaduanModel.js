const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Pengaduan = db.define("pengaduan", {
  id_pengaduan: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tgl_pengaduan: { type: DataTypes.DATE, defaultValue: Sequelize.NOW() },
  nik: DataTypes.STRING,
  isi_laporan: DataTypes.TEXT,
  foto: DataTypes.STRING,
  url: DataTypes.STRING,
  status: DataTypes.STRING,
});

module.exports = Pengaduan;
