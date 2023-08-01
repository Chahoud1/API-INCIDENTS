import mongoose from "mongoose";
import userService from "../service/user.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    };
    next();
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  };
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findById(id);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    };
    req.id = id;
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  };
};




