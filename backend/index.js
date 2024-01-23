const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const jwt = require("jsonwebtoken");
const secretKey = "panda";
const app = express();
const sendMail = require("./sendMail");

app.use(express.json());
app.use(cors());

app.post("/joinpanda", async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    res.status(400).send({ status: false, message: "user already exists" });
  } else {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    console.log(req.body);
    jwt.sign({ user }, secretKey, { expiresIn: "120s" }, (err, token) => {
      if (err) {
        res.send({
          status: false,
          result: "something went wrong, Please try again",
        });
      }
      res.send({ status: true, result, auth: token });
    });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, secretKey, { expiresIn: "120s" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong, Please try again" });
        }
        res.send({ result: user, auth: token });
      });
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post("/forgotp", async (req, res) => {
  await sendMail(req, res);
});

app.patch("/reset/:id", async function (req, res) {
  const id = req.params.id;
  const result = await User.updateOne(
    { _id: id },
    { $set: { password: req.body.password } }
  );
  console.log(result);
  res.send(result);
});

app.listen(5000, () => {
  console.log("application  in running on 5000");
});
