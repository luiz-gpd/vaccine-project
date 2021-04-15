const UserModel = require("../models/user.model");

class User {
    async index(req, res) {

        const users = await UserModel.find();

        res.send(users)
    }

    async store(req, res) {
        const body = req.body;
        const users = await UserModel.find();

        const onThisDay = users.filter((user) => user.consultationDate === body.consultationDate);
        const onThisTime = onThisDay.filter((user) => user.consultationTime === body.consultationTime);
        
        if (onThisTime.length === 2) {
            
            if (body.age >= 60 && (onThisTime[0].age < 60 || onThisTime[1].age < 60)) {
                const user = await UserModel.create(body);
                if (onThisTime[0].age < onThisDay[1].age) {
                    const toRemove = await UserModel.findById(onThisTime[0]._id)
                    await toRemove.remove();
                } else {
                    const toRemove = await UserModel.findById(onThisTime[1]._id)
                    await toRemove.remove();
                }
                res.send(user);
            } else {
                res.send("Já há duas pessoas nesse horário")
            }
        } else {

            const user = await UserModel.create(body);
            res.send(user);
        }

    }

    async update(req, res) {
        const { _id } = req.params
        const { body } = req

        const user = await UserModel.findByIdAndUpdate(_id, body, { new: true });

        res.send(user);
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