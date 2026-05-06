const mongoose = require('mongoose');

// Function to connect to the MongoDB database using Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB successfully!')
    }catch(error) {
        console.error('Error connecting to DB:', error);
    }
}

module.exports = connectDB;  // Exporting the connectDB function to be used in other parts of the application