const express = require("express");
const authRouter = express.Router();
const userModal = require("../Models/UserModal");
const jwt = require("jsonwebtoken");
const JWT_KET = "hbvdvbhdbvh6%^6jbhcjbvehj??/."; // Secret key for jwt

authRouter
  .route("/signup")
  .get(middleware1, getSignup, middleware2)
  .post(postSignup); // Path specfic Middleware

authRouter.route("/login").post(loginUser);

function getSignup(req, res, next) {
  console.log("getSignup page");
  next();
}

function postSignup(req, res) {
  console.log("Request SuccessFull");
  res.json({
    message: "DATA POSTED SUCCESSFULLY",
    ...req.body,
  });
}

function middleware1(req, res, next) {
  console.log("middleware1 exposed");
  next();
}
function middleware2(req, res) {
  console.log("middleware 2 exposed");
  res.sendFile("./views/SignUp.html", { root: __dirname });
}

async function loginUser(req, res) {
  try {
    const loginUserData = req.body;
    if (loginUserData.email) {
      const dbdata = await userModal.findOne({ email: loginUserData.email });
      if (dbdata) {
        const isUserFound = await userModal.findOne({
          email: loginUserData.email,
          passward: loginUserData.passward,
        });
        console.log(isUserFound);
        if (isUserFound) {
          const jwtToken = jwt.sign({ payload: isUserFound["_id"] }, JWT_KET); // creating signature for jwt token
          res.cookie("isLoggedIn", jwtToken); // sending token with cookie
          return res.json({
            message: "user logined SuccessFully!!!",
            ...req.body,
          });
        } else {
          return res.json({
            message: "Invalid Passward",
          });
        }
      } else {
        return res.json({
          message: "Opps Invalid User",
        });
      }
    } else {
      return res.send("Please enter the email");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}
module.exports = authRouter;
