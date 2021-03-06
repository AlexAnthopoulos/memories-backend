const express = require("express");
const mongoose = require("mongoose");
const { router } = require("../app");
const Memory = require("../models/Memories.model");
const User = require("../models/User.model");

router.get("/memories", async (req, res, next) => {
  try {
    const entries = await Memory.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});
router.post("/memories", async (req, res, next) => {
  try {
    const memory = new Memory(req.body);
    const createdMemory = await memory.save();
    res.json(createdMemory);
  } catch (error) {
    console.log(error.name);
    if (error.name === "Validation Error") {
      res.status(422);
    }
    next(error);
  }
});
module.exports = router;
