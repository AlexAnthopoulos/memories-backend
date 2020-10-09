const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const Memory = require("../models/Memories.model");

router.get("/logs", (req, res, next) => {
  Memory.find()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/userlogs", (req, res, next) => {
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

  Memory.findByIdAndDelete(req.params.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/logs", (req, res, next) => {
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
});
module.exports = router;
