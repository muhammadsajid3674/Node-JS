import mongoose from 'mongoose'
import { MONGODB_URI } from '../env.config.js'

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;