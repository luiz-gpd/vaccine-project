const { ObjectID } = require("mongodb");

const user1 = {
  _id: ObjectID(),
  name: "Primeiro",
  age: 20,
  consultationDate: "2021-04-12T03:00:00.000Z",
  consultationTime: "12:00",
  attended: true,
  consultInfo: "Tudo bem"
};

const user2 = {
  _id: ObjectID(),
  name: "Segundo",
  age: 40,
  consultationDate: "2021-04-12T03:00:00.000Z",
  consultationTime: "12:00",
  attended: false,
  consultInfo: ""
};

const newUser = {
  _id: ObjectID(),
  name: "Terceiro",
  age: 50,
  consultationDate: "2021-04-19T03:00:00.000Z",
  consultationTime: "16:30",
  attended: false,
  consultInfo: ""
};

const extraYoungUser = {
  _id: ObjectID(),
  name: "Jovem",
  age: 30,
  consultationDate: "2021-04-12T03:00:00.000Z",
  consultationTime: "12:00",
  attended: false,
  consultInfo: ""
};

const extraOldUser = {
  _id: ObjectID(),
  name: "Idoso",
  age: 80,
  consultationDate: "2021-04-12T03:00:00.000Z",
  consultationTime: "12:00",
  attended: false,
  consultInfo: ""
};

module.exports = {
  user1,
  user2,
  newUser,
  extraYoungUser,
  extraOldUser
};