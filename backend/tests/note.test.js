require("dotenv").config({
  path: ".env.test",
});

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

const userModel = require("../src/models/user.model");
const noteModel = require("../src/models/note.model");

jest.setTimeout(30000);

let token;
let noteId;
let testUserId;
let testEmail;

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    testEmail = `test-${Date.now()}@gmail.com`;

    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: testEmail,
      password: "password123",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "password123",
    });

    token = response.headers["set-cookie"][0];

    const user = await userModel.findOne({ email: testEmail });
    testUserId = user._id;
  } catch (error) {
    throw new Error(`Test setup failed: ${error.message}`);
  }
});

afterAll(async () => {
  try {
    await noteModel.deleteMany({
      user: testUserId,
    });

    await userModel.deleteOne({
      email: testEmail,
    });
  } catch (error) {
    throw new Error(`Test cleanup failed: ${error.message}`);
  }

  await mongoose.connection.close();
});

describe("Note Tests", () => {
  test("Should get user notes", async () => {
    const response = await request(app)
      .get("/api/notes/get-notes")
      .set("Cookie", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Should create a note", async () => {
    const response = await request(app)
      .post("/api/notes/create-note")
      .set("Cookie", token)
      .send({
        heading: "Test Note",
        content: "This is a test note",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    noteId = response.body.note._id;
  });

  test("Should update a note", async () => {
    const response = await request(app)
      .put(`/api/notes/update-note/${noteId}`)
      .set("Cookie", token)
      .send({
        heading: "Updated Note",
        content: "Updated content",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Should delete a note", async () => {
    const response = await request(app)
      .delete(`/api/notes/delete-note/${noteId}`)
      .set("Cookie", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
