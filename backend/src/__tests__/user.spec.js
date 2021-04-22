const request = require('supertest');
const app = require('../index');
const UserModel = require("../models/user.model");
const mongoose = require('mongoose')
const { user1, user2, newUser, extraYoungUser, extraOldUser, lateUser, otherTimeUser } = require('../test_utils/seeds')

require('dotenv').config();

var userCollection;

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  mongoose.connect(process.env.MONGO_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  userCollection = UserModel.collection;
});

beforeEach(async () => {
  await userCollection.deleteMany();
  await userCollection.insertMany([user1, user2]);
});

describe('CRUD functions', () => {

  it('should return all users', async () => {
    const res = await request(app).get("/api/user");
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(2);
  });
  
  it('should return one user', async () => {
    const res = await request(app).get(`/api/user/${user1._id}`);
    expect(res.status).toBe(200)
    expect(res.body.name).toEqual("Primeiro");
  });

  it('should create a new user', async () => {
    const res = await request(app).post("/api/user").send(newUser);
    expect(res.status).toBe(201)
    const res2 = await request(app).get(`/api/user/${res.body._id}`);
    expect(res2.body.name).toEqual("Terceiro");
  });

  it('should update an existing user', async () => {
    const res0 = await request(app).get(`/api/user/${user2._id}`)
    expect(res0.body.name).toEqual("Segundo");
    
    const res = await request(app).put(`/api/user/${user2._id}`).send({
      name: "Nome Diferente"
    });
    expect(res.status).toBe(200)

    const res2 = await request(app).get(`/api/user/${user2._id}`);
    expect(res2.body.name).toEqual("Nome Diferente");
  });

  it('should delete an existing user', async () => {
    const res = await request(app).delete(`/api/user/${user2._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ "message": "Usuário removido" });
  });

  it('should send a message that there is no user for deleting', async () => {
    const res = await request(app).delete("/api/user/0000");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ "message": "Usuário inexistente" });
  });
});

describe ('Extra utilities on user controller', () => {
  it('Should not let three young users at same day and time', async () => {
    
    const res = await request(app).post("/api/user").send(extraYoungUser);
    expect(res.body).toEqual({ message: "Erro ao criar usuário" });

    const res2 = await request(app).get(`/api/user/${extraYoungUser}`);
    expect(res2.status).toBe(400);
  });

  it('Should remove the younger user when a elderly comes to the same hour', async () => {

    const res0 = await request(app).get(`/api/user/${user1._id}`);
    expect(res0.status).toBe(200)
    
    const res1 = await request(app).post("/api/user").send(extraOldUser);
    expect(res1.status).toBe(201);

    const res2 = await request(app).get(`/api/user/${res1.body._id}`);
    expect(res2.body.name).toEqual("Idoso");

    const res3 = await request(app).get(`/api/user/${user1._id}`);
    expect(res3.body).not.toBeValid;
  });
  it('Should not let the consultation date be one that already passed or today', async () => {
    
    const res = await request(app).post("/api/user").send(lateUser);
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ message: "Não é possível agendar para esse dia" });

    const res2 = await request(app).get(`/api/user/${lateUser._id}`);
    expect(res2.status).toBe(200);
  });
  it('Should not let the consultation time be different of HH:00 or HH:30', async () => {
    
    const res = await request(app).post("/api/user").send(otherTimeUser);
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ message: "Não é possível agendar para esse horário" });

    const res2 = await request(app).get(`/api/user/${otherTimeUser._id}`);
    expect(res2.status).toBe(200);
  });

});