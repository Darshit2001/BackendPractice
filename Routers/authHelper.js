const jwt = require("jsonwebtoken");
const JWT_KET = "hbvdvbhdbvh6%^6jbhcjbvehj??/.";

function checkUserLoggedIn(req, res, next) {
  // console.log(req.cookies);
  const isVerified = jwt.verify(req.cookies.isLoggedIn, JWT_KET); // it creates a new signature with help of
  // header payload(uid) and secret key from token received from req and match it with the old signature to verify user
  if (isVerified) {
    next();
  } else {
    res.json({
      message: "Operation Failed!! Login First",
    });
  }
}

module.exports = checkUserLoggedIn;
