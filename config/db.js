const colors = require ('colors')
const mongoose = require ('mongoose')

//funcion para conctar a la base de datos

async function connectDB (){
    const conn =  await mongoose.connect('mongodb://localhost:27017/devcamp-2687350')
    console.log (`conexion exitosa a mongodb:${conn.connection.host}`.bgGreen.blue)
}
module.exports = connectDB
