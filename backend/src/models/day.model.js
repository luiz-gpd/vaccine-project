const mongoose = require("mongoose");

const daySchema = new mongoose.Schema(
    {
        date:String, 
        complement: [
            {
                userTime: String,
                userAge:Number,
                userId: String
            }
        ]
    }, {
        timestamps: true
    });

const DayModel = mongoose.model("day", daySchema);

module.exports = DayModel;