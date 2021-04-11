const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        consultationDate: Date,
        consultationTime: String,
        attended: Boolean,
        consultInfo: String,
    }, {
        timestamps: true
    });

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;