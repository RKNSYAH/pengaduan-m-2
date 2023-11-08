const Masyarakat = require("./MasyarakatModel.js");
const Pengaduan = require("./PengaduanModel.js");
const Petugas = require("./PetugasModel.js");
const Tanggapan = require("./TanggapanModel.js");

Tanggapan.belongsTo(Pengaduan,{
    foreignKey:"id_pengaduan",
    onDelete:"CASCADE"
})

Pengaduan.hasMany(Tanggapan, {
    foreignKey: "id_pengaduan"
})

Tanggapan.belongsTo(Petugas,{
    foreignKey:"id_petugas",
})

Petugas.hasMany(Tanggapan,{
    foreignKey:"id_petugas"
})

module.exports = {Masyarakat, Pengaduan, Petugas, Tanggapan}