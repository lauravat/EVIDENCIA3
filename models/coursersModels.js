const mongoose = require("mongoose");

const BootcampSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true,
             ""],
        unique: true, 
        maxlength: [100, "titulo del curso no mayor a 50"]
    },
    description:{
        type: String,
        required: [true, ""],
        unique: true,
        maxlength: [100, "Descripcion del curso no mayor a 50"]
    },
    weeks:{
        type:Number,
        maxlength:[10, "Semana no mayor a 10 numeros"]
    },
    tuition:{
        type:Number,
        maxlength:[10, "No mayor a 10 numeros"]
    },
    minimumSkill:{
        type:[String],
        required: [true, 
            "Alguna de las opciones requeridas"],
        enum:["beniiger","Intermediate","Advance"]
        }
})

module.exports = mongoose.model('Coursers', BootcampSchema)