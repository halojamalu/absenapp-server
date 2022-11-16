const express = require("express");
const router = express.Router();
const AbsensiModel = require("../models/absensi");

// Routing endpoint absensi utama
router.get("/", async (req, res) => {
  const absensi = await AbsensiModel.findAll();
  res.status(200).json({
    absensi,
    metadata: "get test data absensi!",
  });
});

router.post("/checkin", async (req, res) => {
  const { nip } = req.body;

  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "in",
  });
  res.status(200).json({
    data: absensi,
    metadata: "check in berhasil!",
  });
});

router.post("/checkout", async (req, res) => {
  const { nip } = req.body;

  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "out",
  });
  res.status(200).json({
    data: absensi,
    metadata: "check out berhasil!",
  });
});

module.exports = router;
