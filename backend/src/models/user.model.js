const mongoose = require("mongoose");

const UserSchema = 
    {
        name: String,
        age: Number,
        consultationDate: Date,
        consultationTime: String,
    }

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;