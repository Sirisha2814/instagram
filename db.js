const mongoose = require('mongoose')
const MONGO_URI = "mongodb+srv://sirisha:Sirisha2801@cluster0.cp3qlbh.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
   await mongoose.connect(MONGO_URI)
    console.log(`MongoDB Connected`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}
module.exports = connectDB