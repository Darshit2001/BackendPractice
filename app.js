const express = require("express");
const app = express();
const cookieParse = require("cookie-parser");

const userModal = require("./Models/UserModal");

app.listen(3005);
app.use(cookieParse()); // To use cookieParser from Anywhere in application through req and res
app.use(express.json()); // Global Middleware

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/About.html", { root: __dirname });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

const userRouter = require("./Routers/userRouters");
const authRouter = require("./Routers/authRouters");

app.use("/auth", authRouter); // Global Middleware
app.use("/user", userRouter);

app.use((req, res) => {
  res.status(404).sendFile("/views/error.html", { root: __dirname });
});
