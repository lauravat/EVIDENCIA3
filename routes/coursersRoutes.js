const express = require("express");
const Coursers = require("../models/coursersModels.js");
//definir ruteador de bootcamps
const router = express.Router();

router.get("/", async (req, res) => {
  // traer los bootcamps en bd
  const bootcamps = await Coursers.find();
  return res.json({
    succes: true,
    data: bootcamps,
  });
});

router.get("/:id", async (req, res) => {
  const bootcampId = req.params.id;
  //Consultar bootcamp po id
  const bootcamp = await Coursers.findById(bootcampId);
  return res.json({
    succes: true,
    data: bootcamp,
  });
});

router.post("/", async (req, response) => {
  const newBootcamp = await Coursers.create(req.body);
  return response.json({
    success: true,
    data: newBootcamp,
  });
});

router.put("/:id", async(req, res) => {
  bootcampId = req.params.id;
  updBootcamp =  await Coursers.findByIdAndUpdate(
    bootcampId,
    req.body, {
        new: true
    }
  )
  return res.json({
    succes: true,
    data: updBootcamp
  });
});


//4. eliminar

router.delete("/:id", async (req, res) => {
   const bootcampId = req.params.id;
   const courser = await Coursers.findByIdAndDelete(
    bootcampId
   )
   res.json({
    succes: true,
    data: courser
  });
});
module.exports = router;
