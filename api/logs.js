const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const Memory = require("../models/Memories.model");

router.get("/logs", (req, res, next) => {
  //console.log("Logs get: The body is: ", req.body);
  console.log("Logs get: The user is ", req.user);
  Memory.find()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      next(error);
    });
  // try {
  //   const entries = await Memory.find();
  //   res.json(entries);
  // } catch (error) {
  //   next(error);
  // }
});

router.get("/userlogs", (req, res, next) => {
  //console.log("Logs get: The body is: ", req.body);
  console.log("Logs get: The user is ", req.user);
  Memory.find({
    user: mongoose.Types.ObjectId(req.user._id),
  })
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/userlogs/:id", (req, res, next) => {
  // req.params.id
  console.log("Logs delete:", req.params.id);
  console.log("Logs get: The user is ", req.user);
  Memory.findByIdAndDelete(req.params.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/logs", (req, res, next) => {
  console.log("Logs : The body is Memories: ", req.body);
  console.log("Logs: The user is ", req.user);
  console.log("This is the request ", req);
  const newMemory = {
    ...req.body,
    user: mongoose.Types.ObjectId(req.user._id),
  };
  Memory.create(newMemory)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      next(error);
    });
  // try {
  //   const memory = new Memory(req.body);
  //   const createdMemory = await memory.save();
  //   res.json(createdMemory);
  // } catch (error) {
  //   console.log(error.name);
  //   if (error.name === "Validation Error") {
  //     res.status(422);
  //   }
  //   next(error);
  // }
});
module.exports = router;
