import supertest from "supertest";
import { prisma } from "../src/config/db.js";

import server from "../src/index.js";
import userUtils from "../src/utils/userUtils.js";
import userFactory from "./factories/userFactory.js";

const APP = supertest(server);

beforeEach(async () => {
  await prisma.user.deleteMany({});
});

describe("User tests suite", () => {
  it("should create a user", async () => {
    const userData = userFactory.generateUserBody();

    const response = await APP.post("/users").send(userData);

    const createdUser = await prisma.user.findUnique({ where: { email: userData.email } });

    expect(response.status).toBe(201);
    expect(response.body.userId).toEqual(createdUser?.id);
  });

  it("should return a token when user succesfully signs in", async () => {
    const user = await userFactory.create();

    const response = await APP.post("/sign-in").send({ email: user.email, password: user.signInPassword });
    const isTokenValid = userUtils.verifyToken(response.body.token);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(isTokenValid.userId).toEqual(user.id);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
