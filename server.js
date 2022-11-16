const express = require("express");
const cors = require("cors");
const port = 3000;

console.log("running server port", port);

const sequelize = require("./db.config");
sequelize.sync().then(() => console.log("database ready!"));

//pikir
const userEndpoint = require("./routes/users");
const absensiEndpoint = require("./routes/absensi");

const app = express();
app.use(cors());
app.use(express.json());

//pikir
app.use("/users", userEndpoint);
app.use("/absensi", absensiEndpoint);

app.listen(port, () => console.log(`running server on port ${port}`));
