import mongoose from "mongoose";  
const {ObjectId} = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
   car: {type: ObjectId, ref: 'Car', required: true}, 
   user: {type: ObjectId, ref: 'User', required: true},
   owner: {type: ObjectId, ref: 'User', required: true},
   pickupdate: {type: Date, required: true}, 
   returndate: {type: Date, required: true},
   status: {type: String, enum:['pending', 'confirmed', 'cancelled'], required: true, default: 'pending'}, 
   price: {type: Number, required: true}, 
}, {timestamps: true})

const Booking = mongoose.model('Booking', bookingSchema)  

export default Booking