const express = require("express");
const router = express.Router();
const UsersModel = require("../models/users");
const bcrypt = require("bcrypt");
const passwordCheck = require("../utils/passwordCheck");

// Routing endpoint users utama
router.get("/", async (req, res) => {
  const users = await UsersModel.findAll();
  res.status(200).json({
    data: users,
    metadata: "get data users!",
  });
});

router.post("/", async (req, res) => {
  // nip, nama, password ->>>>>>>>>>>>>>>>>> BE nangkep
  const { nip, nama, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 5);

  const users = await UsersModel.create({
    nip,
    nama,
    password: encryptedPassword,
  });

  res.status(200).json({
    registered: users,
    metadata: " create data!",
  });

  // try {
  //   const users = await UsersModel.create({
  //     nip,
  //     nama,
  //     password: encryptedPassword,
  //   });

  //   //test

  //   if (users == true) {
  //     res.status(200).json({
  //       registered: users,
  //       metadata: " create data!",
  //     });
  //   }
  // } catch (error) {
  //   res.status(400).json({
  //     error: "invalid register!",
  //   });
  // }
});

router.put("/", async (req, res) => {
  // nip, nama, password ->>>>>>>>>>>>>>>>>> BE nangkep
  const { nip, nama, password, passwordBaru } = req.body;
  const check = await passwordCheck(nip, password);
  const encryptedPassword = await bcrypt.hash(passwordBaru, 5);

  //password yang muncul di db === password dari inputan
  if (check.compare === true) {
    const users = await UsersModel.update(
      {
        nama,
        password: encryptedPassword,
      },
      { where: { nip: nip } }
    );
    res.status(200).json({
      users: { updated: users[0] },
      metadata: " user updated!",
    });
  } else {
    res.status(400).json({
      error: "data invalid!",
    });
  }
});

//login
router.post("/login", async (req, res) => {
  const { nip, password } = req.body;

  // pake try catch biar server gk mati ketika data input salah
  try {
    const check = await passwordCheck(nip, password);
    if (check.compare == true) {
      res.status(200).json({
        users: check.userData,
        metadata: "login berhasil!",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "data invalid!",
    });
  }
});

module.exports = router;
