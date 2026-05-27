import mongoose from "mongoose";
import dns from "dns";

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected')); 
        await mongoose.connect(process.env.MONGODB_URI, {
            family: 4,
        })
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;