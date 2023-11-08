const express = require("express");
const {
  deleteMasyarakat,
  getMasyarakat,
  getMasyarakatById,
  postMasyarakat,
  updateMasyarakat,
  getPetugas,
  getPetugasById,
  postPetugas,
  updatePetugas,
  deletePetugas,
  login,
  postPengaduan,
  getPengaduan,
  deletePengaduan,
} = require("../controller/controllers.js");
// const { verifyToken } = require("../middleware/verifyToken.js");
// const { refreshToken } = require("../controller/refreshtoken.js");

const router = express.Router();

router.post("/login", login);
router.get("/masyarakat", getMasyarakat);
router.get("/masyarakat/:nik", getMasyarakatById);
router.post("/masyarakat", postMasyarakat);
router.delete("/masyarakat/:nik", deleteMasyarakat);
router.patch("/masyarakat/:nik", updateMasyarakat);
router.get("/petugas", getPetugas);
router.get("/petugas/:id", getPetugasById);
router.post("/petugas/", postPetugas);
router.delete("/petugas/:id", deletePetugas);
router.patch("/petugas/:id", updatePetugas);
router.post("/pengaduan/", postPengaduan);
router.get("/pengaduan/", getPengaduan);
router.delete("/pengaduan/:id", deletePengaduan);
// router.get("/token", refreshToken);

module.exports = router;
