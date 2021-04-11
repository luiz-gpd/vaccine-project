const moment = require('moment');
const UserModel = require("../models/user.model");
const DayModel = require("../models/day.model");

class User {
    async index(req, res) {

        const users = await UserModel.find();

        res.send( users )
    }

    async store(req, res) {
        const body = req.body;

        // const dates = await DayModel.find();
        // const onThisDay = dates.filter((date) => date.date === body.consultationDate);

        // if (onThisDay.length === 2) {
        //     if (body.age >= 60 && (onThisDay[0] < 60 || onThisDay[1] < 60)) {

        //     } 

        // } else {

            const user = await UserModel.create(body);
            // const date = {
            //     date: body.consultationDate,
            //     complement: [
            //         {
            //             userTime: user.consultationTime,
            //             userAge: user.age,
            //             userId: user._id
            //         }
            //     ]
            // }
            // await DayModel.create(date);
            res.send({ user });
        // }

    }

    async update(req, res) {
        const { _id } = req.params
        const { body } = req

        const user = await UserModel.findByIdAndUpdate(_id, body, { new: true });

        res.send({ user });
    }

    async remove({ params: { _id } }, res) {

        try {
            const user = await UserModel.findById(_id)
            if (!user) { return res.json({ message: "User does not exist" }) }

            await user.remove();
            res.json({ message: "User deleted" });

        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

};

module.exports = new User();