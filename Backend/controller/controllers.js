const {
  Masyarakat,
  Pengaduan,
  Tanggapan,
  Petugas,
} = require("../models/index");
const bcryptjs = require("bcrypt");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const payload = req.body;
    const petugasdata = await Petugas.findOne({
      where: { username: payload.username }
    })
    res.clearCookie("cookieMasyarakat");
    res.clearCookie("cookiePetugas");
    if(!petugasdata) {
      const userdata = await Masyarakat.findOne({
        where: { username: payload.username },
      });
      if (userdata) {
        const hashcheck = bcryptjs.compareSync(
          payload.password,
          userdata.password
        );
        if (!hashcheck) return res.status(406).json({ msg: "Password Salah" });
        const accessToken = jwt.sign(
          { nik: userdata.nik, nama: userdata.nama, level: "masyarakat" },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.cookie('cookieMasyarakat', accessToken)
        return res.status(200).json(userdata);
      } else return res.status(406).json({ msg: "Akun tidak ditemukan" });
    }
    if (petugasdata) {
      let level = petugasdata.level
      const hashcheck = bcryptjs.compareSync(
        payload.password,
        petugasdata.password
      );
      if (!hashcheck) return res.status(406).json({ msg: "Password Salah" });
      const accessToken = jwt.sign(
        { nik: petugasdata.nik, nama: petugasdata.nama_petugas, level: level },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
      res.cookie('cookiePetugas', accessToken)
      return res.status(200).json(petugasdata);
    } 
  } catch (error) {
    console.error(error);
  }
};

// Controller Masyarakat
exports.getMasyarakat = async (req, res) => {
  try {
    const response = await Masyarakat.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getMasyarakatById = async (req, res) => {
  try {
    const response = await Masyarakat.findOne({
      where: { nik: req.params.nik },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.postMasyarakat = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    if (
      !payload.username ||
      !payload.password ||
      !payload.confirmPassword ||
      !payload.nama ||
      !payload.telp ||
      !payload.nik
    )
      return res.status(406).json({ msg: "Values cannot be empty" });
    if (payload.password !== payload.confirmPassword)
      return res.status(406).json({ msg: "Passwords do not match" });

    const hashed = bcryptjs.hashSync(payload.password, 12);
    payload["password"] = hashed;

    const request = await Masyarakat.create(payload);
    res.status(200).json({ msg: "Data berhasil dikirim", request });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateMasyarakat = async (req, res) => {
  try {
    const request = Masyarakat.update(
      {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        telp: req.body.telp,
      },
      { where: { nik: req.params.nik } }
    );
    res.status(200).json({ msg: `Data ${req.params.nik} berhasil diupdate` });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteMasyarakat = async (req, res) => {
  try {
    const request = await Masyarakat.destroy({
      where: { nik: req.params.nik },
    });
    if (request) return res.status(200).json({ msg: "Data berhasil dihapus" });
    return res.status(404).json({ msg: "Data tidak ditemukan" });
  } catch (error) {
    console.log(error.message);
  }
};

// Controller Petugas
exports.getPetugas = async (req, res) => {
  try {
    const response = await Petugas.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPetugasById = async (req, res) => {
  try {
    const response = await Petugas.findOne({
      where: { id_petugas: req.params.id },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.postPetugas = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    if (
      !payload.username ||
      !payload.password ||
      !payload.nama_petugas ||
      !payload.telp
    )
      return res.status(406).json({ msg: "Values cannot be empty" });

    const hashed = bcryptjs.hashSync(payload.password, 12);
    payload["password"] = hashed;
    const request = await Petugas.create(payload);
    res.status(200).json({ msg: "Data berhasil dikirim", request });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updatePetugas = async (req, res) => {
  try {
    const payload = req.body;
    const request = Petugas.update(
      {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        telp: req.body.telp,
        level: req.body.level,
      },
      { where: { id_petugas: req.params.id } }
    );
    res.status(200).json({ msg: `Data ${req.params.id} berhasil diupdate` });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deletePetugas = async (req, res) => {
  try {
    const request = Petugas.destroy({ where: { id_petugas: req.params.id } });
    if (request) return res.status(200).json({ msg: "Data berhasil dihapus" });
    return res.status(404).json({ msg: "Data tidak ditemukan" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPengaduan = async (req, res) => {
  try {
    const response = await Pengaduan.findAll({
      order: [["tgl_pengaduan", "ASC"]],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.postPengaduan = async (req, res) => {
  try {
    if (req.files == null) return res.send({ msg: "No file uploaded" });
    const payload = req.body;

    const file = req.files.image;
    const filesize = file.data.length;
    const ext = path.extname(file.name);
    const filename = file.md5 + ext;
    payload["url"] = `${req.protocol}://${req.get("host")}/images/${filename}`;

    if (filesize > 5000000)
      return res.status(422).send({ msg: "file is too large" });

    await file.mv(`./public/images/${filename}`);
    payload["foto"] = filename;
    const data = await Pengaduan.create(payload);

    res.status(200).send({msg: "Laporan Terkirim" ,data});
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.deletePengaduan = async (req, res) => {
  try {
    const request = Pengaduan.destroy({
      where: { id_pengaduan: req.params.id },
    });
    if (request) return res.status(200).json({ msg: "Data berhasil dihapus" });
    return res.status(404).json({ msg: "Data tidak ditemukan" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updatePengaduan = async (req, res) => {
  try {
    const payload = req.body;
    if (req.files) {
      const file = req.files.image;
      const filesize = file.data.length;
      const ext = path.extname(file.name);
      const filename = file.md5 + ext;
      payload["url"] = `${req.protocol}://${req.get(
        "host"
      )}/images/${filename}`;

      if (filesize > 5000000)
        return res.status(422).send({ msg: "file is too large" });

      await file.mv(`./public/images/${filename}`);
      payload["foto"] = filename;
    }
    const request = Pengaduan.update(payload, {
      where: { id_pengaduan: req.params.id },
    });
    res.status(200).json({ msg: `Data ${req.params.id} berhasil diupdate` });
  } catch (error) {
    console.log(error.message);
  }
};
exports.getTanggapan = async (req, res) => {
  try {
    const response = await Tanggapan.findAll({
      order: [["tgl_tanggapan", "ASC"]],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.postTanggapan = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    if (
      !payload.id_pengaduan ||
      !payload.tanggapan ||
      !payload.id_petugas
    )
      return res.status(406).json({ msg: "Values cannot be empty" });

    const data = await Tanggapan.create(payload);

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

exports.deleteTanggapan = async (req, res) => {
  try {
    const request = Tanggapan.destroy({
      where: { id_tanggapan: req.params.id },
    });
    if (request) return res.status(200).json({ msg: "Data berhasil dihapus" });
    return res.status(404).json({ msg: "Data tidak ditemukan" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateTanggapan = async (req, res) => {
  try {
    const payload = req.body;
    const request = Tanggapan.update(payload, {
      where: { id_tanggapan: req.params.id },
    });
    res.status(200).json({ msg: `Data ${req.params.id} berhasil diupdate` });
  } catch (error) {
    console.log(error.message);
  }
};
