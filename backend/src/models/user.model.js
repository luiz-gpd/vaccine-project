const mongoose = require("mongoose");

const UserSchema = 
    {
        name: String,
        age: Number,
        consultationDate: Date,
        consultationTime: String,
        attended: Boolean,
    }

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;