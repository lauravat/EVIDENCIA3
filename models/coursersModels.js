const mongoose = require("mongoose");

const BootcampSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true,""],
        maxlength: [30, "titulo del curso maximo 30"],
        minlenght: [10, "titulo del curso minimo 10"]

    },
    description:{
        type: String,
        required: [true, ""],
        minlength: [10, "Descripcion del curso minimo 10"]
    },
    weeks:{
        type:Number,
        required: [true, ""],
        max:[9, "Semana no mayor a 9"]
    },
    enroll_cost:{
        type:Number,
        required: [true, ""]
    },
    minimumSkill:{
        type:[String],
        required: [true, 
            "Alguna de las opciones requeridas"],
        enum:["beniiger","Intermediate","Advance", "Expert"]
        }
})

module.exports = mongoose.model('Coursers', BootcampSchema)