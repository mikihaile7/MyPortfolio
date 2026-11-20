import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../config/config.js";

// POST /auth/signin - verify credentials and return a signed JWT
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, {
      expiresIn: "1d",
    });
    res.cookie("t", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// GET /auth/signout - clear the auth cookie
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out" });
};

// Protects a route: requires a valid "Authorization: Bearer <token>" header. Decoded token -> req.auth
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
});

// Only the owner of the profile (or an admin) may modify it
const hasAuthorization = (req, res, next) => {
  const isOwner = req.profile && req.auth && req.profile._id == req.auth._id;
  const isAdmin = req.auth && req.auth.role === "admin";
  if (!isOwner && !isAdmin) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

// Only admins may perform create / update / delete on portfolio content.
// Role is re-checked in the database so a demoted user loses access immediately.
const isAdmin = async (req, res, next) => {
  try {
    const user = req.auth && (await User.findById(req.auth._id).select("role"));
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Admin access required" });
  }
};

export default { signin, signout, requireSignin, hasAuthorization, isAdmin };
