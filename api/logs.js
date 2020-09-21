const { Router } = require("express");
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
  // try {
  //   const entries = await Memory.find();
  //   res.json(entries);
  // } catch (error) {
  //   next(error);
  // }
});
router.post("/logs", (req, res, next) => {
  const {
    title,
    comments,
    desciption,
    image,
    memoryDate,
    latitude,
    longitude,
  } = req.body;
  Memory.create(req.body)
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
