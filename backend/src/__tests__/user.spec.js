const request = require('supertest');
const app = require ('../index');
const UserModel = require("../models/user.model");
const mongoose = require('mongoose')
const { user1, user2 } = require('../test_utils/seeds')

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
 
describe('CRUD tests', () => {
    it('should return all users', async () => {
      const res = await request(app).get("/api/user");
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2);
    });
    
  });
