const mongoose = require("mongoose");

const UserSchema = 
    {
        name: String,
    }

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;