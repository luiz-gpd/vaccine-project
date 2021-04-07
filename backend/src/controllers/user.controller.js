const UserModel = require("../models/user.model");
const data = require("../database")

class User {
    async index(req, res) {
        res.send({ data })
    }

    async store(req, res) {

        const user = req.body;
        const { consultationTime: time } = req.body;
        const { age: nowAge } = req.body;

        const peopleOnThisTime = data.filter((dat) => dat.consultationTime === time)

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

};

module.exports = new User();