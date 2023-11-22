const express = require("express");
const Bootcamp = require("../models/bootcampsModel");
const { default: mongoose } = require("mongoose");
//definir ruteador de bootcamps
const router = express.Router();

router.get("/", async (req, res) => {
  // traer los bootcamps en bd
  const bootcamps = await Bootcamp.find();
  //escenario: no hay bootcamps en mongo
  if (bootcamps.length>0) {
    //hay bootcamps en mongo
    res.
      status(200).
      json({
      succes:true,
      data:bootcamps
    })
  } else {
    //no hay bootcamps en mongo
      res.
      status(404).
      json({
        succes:false,
        msg:"No hay bootcamps"
    })
  }
})

router.get("/:id", async (req, res) => {
  const bootcampId = req.params.id;

  try {
    //escenario: bootcampId sea invalido
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return res.status(404).json({
        succes: false,
        msg:"id invalido"
      })
    }else{
        //Consultar bootcamp por id
      const bootcamp = await Bootcamp.findById(bootcampId)
      //console.log(bootcamp)
      if (!bootcamp) {
        //si no hay bootcamp 
        res.status(404).json({
          succes:false,
          msg:"bootcamp no encontradoo"
        })
      } else {
        return res.status(200).json({
          succes: true,
          data: bootcamp,
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      succes:false,
      msg:`Error encontrado ${error.message}`
    })
  }
});

router.post("/", async (req, response) => {
  try {
    const newBootcamp = await Bootcamp.create(req.body)
    return response.status(201).json({
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
  const bootcampId = req.params.id;

  try {
    //escenario: bootcampId sea invalido
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return res.status(404).json({
        succes: false,
        msg:"id invalido"
      })
    }else{
        //Consultar bootcamp por id
      const bootcamp = await Bootcamp.findByIdAndUpdate(bootcampId, req.body,{new:true,})
      //console.log(bootcamp)
      if (!bootcamp) {
        //si no hay bootcamp 
        res.status(404).json({
          succes:false,
          msg:"bootcamp no encontradoo"
        })
      } else {
        return res.status(200).json({
          succes: true,
          data: bootcamp,
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      succes:false,
      msg:`Error encontrado ${error.message}`
    })
  }
});


//4. eliminar

router.delete("/:id", (req, res) => {
  bootcampId = req.params.id;
  return res.json({
    succes: true,
    msg: `eliminando bootcamp cuyo id es: ${bootcampId}`,
  });
});
module.exports = router;
