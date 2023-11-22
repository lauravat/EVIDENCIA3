const express = require("express");
const Coursers = require("../models/coursersModels.js");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  // traer los coursers en bd
  const courses = await Coursers.find();
  if (courses.length>0) {
    //hay coursers en mongo
    res.
      status(200).
      json({
      succes:true,
      data:courses
    })
  } else {
    //no hay coursers en mongo
      res.
      status(404).
      json({
        succes:false,
        msg:"No hay coursers"
    })
  }
})

router.get("/:id", async (req, res) => {
  const bootcampId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return res.status(404).json({
        succes: false,
        msg:"id invalido"
      })      
    } else {
      //Consultar bootcamp po id
        const bootcamp = await Coursers.findById(bootcampId);
        if (!bootcamp) {
          res.status(404).json({
            succes:true,
            msg:"Bootcamp no encontrado"
          })
        } else {
            return res.json({
            succes: true,
            data: bootcamp,
          });
        }

    }
  } catch (error) {
    res.status(500).json({
      succes:false,
      msg:`Error encontrado ${error.message}`
    })
  }
});

router.post("/", async (req, response) =>{ 
  try {
    const newBootcamp = await Coursers.create(req.body);
  return response.json({
    success: true,
    data: newBootcamp,
  })
  } 
  catch (error) {
    response.status(500).json({
      succes:false,
      msg:`Error encontrado: ${error.message}`
  })
 }
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
