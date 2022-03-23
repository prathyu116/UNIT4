const express = require("express");
const userController = require("./controllers/user.controller");
const {
  register,
  login,
  generateToken,
} = require("./controllers/auth.controller");
const productController = require("./controllers/product.controller");
const passport = require("./configs/google-auth");

const app = express();
app.use(express.json());

app.use("/users", userController);
app.post("/register", register);
app.post("/login", login);
app.use("/products", productController);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    const token = generateToken(req.user);

    return res.status(200).send({ user: req.user, token });
  }
);
module.exports = app;
