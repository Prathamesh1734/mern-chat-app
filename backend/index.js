const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserModel } = require("./models/User");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json({
    message: "test ok",
  });
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json({
      message: "No token",
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    const passOk = bcrypt.compareSync(password, existingUser.password);
    if (passOk) {
      jwt.sign(
        { userId: existingUser._id, username },
        jwtSecret,
        {},
        (err, token) => {
          res.cookie("token", token, { sameSite: "none", secure: true }).json({
            id: existingUser._id,
          });
        }
      );
    }
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await UserModel.create({
      username: username,
      password: hashedPassword,
    });
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({
            message: "Ok",
            id: createdUser._id,
          });
      }
    );
  } catch (error) {
    if (error) throw error;
  }
});

app.listen(3000, () => {
  console.log("started on 3000");
});
