const UserModel = require("../models/user.model");
const moment = require('moment')

class User {
    async index(req, res) {

        const users = await UserModel.find();

        res.send(users)
    }

    async getOne(req, res) {
        const { id } = req.params;

        try {
            const user = await UserModel.findById(id);
            res.send(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async store(req, res) {
        const body = req.body;
        const users = await UserModel.find();

        if (body.consultationTime.includes("00") || body.consultationTime.includes("30")) {

            if (moment(body.consultationDate).isSameOrBefore(new Date)) {
                res.status(400).json({ message: "Não é possível agendar para esse dia" });
            } else {
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
                        res.status(201);
                        res.send(user);
                    } else {
                        res.send({ message: "Erro ao criar usuário" })
                    }
                } else {

                    const user = await UserModel.create(body);
                    res.status(201);
                    res.send(user);
                }
            }

        } else  {res.status(400).json({ message: "Não é possível agendar para esse horário" }); }
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
            if (!user) { return (res.json({ message: "Usuário inexistente" })) }

            await user.remove();
            res.json({ message: "Usuário removido" });

        } catch (e) {
            res.status(400).json({ message: "Usuário inexistente" });
        }
    }

};

module.exports = new User();