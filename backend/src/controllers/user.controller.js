const UserModel = require("../models/user.model");
const data = require("../database")

class User {
    async index(req, res) {
        res.send(data)
    }

    async store(req, res) {

        const user = req.body;
        const { consultationTime: time } = req.body;
        const { age: nowAge } = req.body;
        const { consultationDate: date } = req.body;

        const peopleOnThisDate = data.filter((dat) => dat.consultationDate === date);

        const peopleOnThisTime = peopleOnThisDate.filter((dat) => dat.consultationTime === time)

        if (peopleOnThisTime.length === 2) {
            if (nowAge >= 60) {
                if (peopleOnThisTime[0].age < 60 || peopleOnThisTime[1].age < 60) {
                    data.push(user);
                    if (peopleOnThisTime[0].age >= peopleOnThisTime[1].age) {
                        const position = data.indexOf(peopleOnThisTime[1]);
                        data.splice(position, 1);
                        res.send({ user })
                    }
                    else {
                        const position = data.indexOf(peopleOnThisTime[0]);
                        data.splice(position, 1);
                        res.send({ user })
                    }
                }
            } else {
                res.send("Já há duas pessoas nesse horário");
            }
        } else {
            data.push(user);
            res.send({ user });
        }
    }

    async updateAttended(req, res) {
        const { name } = req.params
        const { consultationDate } = req.params
        const { consultationTime } = req.params

        const peopleOnThisDate = data.filter((dat) => dat.consultationDate === consultationDate);
        const peopleOnThisTime = peopleOnThisDate.filter((dat) => dat.consultationTime === consultationTime)
        const individual = peopleOnThisTime.filter((dat) => dat.name === name)

        const position = data.indexOf(individual[0]);
        data[(position)].attended = !data[(position)].attended
        const user = data.filter((dat) => dat.name === name)
        res.send(user)
    }

};

module.exports = new User();