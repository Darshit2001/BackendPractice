const express = require("express");
const userRouter = express.Router();
const userModal = require("../Models/UserModal");
const checkUserLoggedIn = require("./authHelper");
userRouter
  .route("/")
  .get(checkUserLoggedIn, getUser)
  .post(postUser) // Path specfic Middleware
  .patch(patchUser)
  .delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUser);

async function getUser(req, res) {
  let allUserData = await userModal.find();
  res.json({
    message: "Data receved Sucessfully",
    data: allUserData,
  });
}
async function postUser(req, res) {
  let posteddata = await userModal.create(req.body);

  res.json({
    message: "data Submitted Succesfully",
    ...posteddata._doc,
  });
}
async function patchUser(req, res) {
  let updateddata = await userModal.findOneAndUpdate(req.query, req.body);
  res.send({
    message: "Updated Sucessfully",
    ...updateddata._doc,
  });
}
async function deleteUser(req, res) {
  const deleteddata = await userModal.findOneAndDelete(req.query);
  res.send({
    message: "Deleted SucessFully",
    data: deleteddata,
  });
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log("cookie", cookies);
  res.send("cookies recieved");
}

function setCookies(req, res) {
  // res.setHeader("Set-Cookie", "isLoggedIn=True");
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.cookie("isPrimeMember", true);
  res.send("cookies has been send");
}

module.exports = userRouter;
