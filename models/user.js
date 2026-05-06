const mongoose = require('mongoose');


//the object we are going to put here will show how the users will be structured in the database, it will be like a blueprint for our users collection in MongoDB
const userSchema = mongoose.Schema({
    name: {type: String, required: true},  //name field of type String and it is required
    email: {type: String, required: true, unique: true},  //email field of type String, it is required and must be unique
    password: {type: String, required: true}  //password field of type String and it is required
})

module.exports = mongoose.model('User', userSchema);  //exporting the User model based on the userSchema, this will allow us to interact with the users collection in the database using this model