const request = require("supertest");
const app = require("../index.js");

describe("User Authentication Endpoints", () => {
  // Successful login
  test("Should login with correct credentials", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("token");
  });

  // Unsuccessful login - invalid email
  test("Should not login with invalid email", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "invalid@example.com", password: "password123" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });

  // Unsuccessful login - invalid password
  test("Should not login with invalid password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "invalidpassword" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });

  // Registration
  test("Should register new user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({ email: "newuser@example.com", password: "password123" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty(
      "message",
      "Verification email sent. Please check your email to complete registration."
    );
  });

  // Logout
  test("Should logout user", async () => {
    const response = await request(app).post("/api/logout");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User logged out successfully."
    );
  });

  // Get current user
  test("Should get current user", async () => {
    const response = await request(app).get("/api/current-user");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("email");
    // Add more assertions based on the response structure
  });
  /// TO COMPLETE /// MAYBE NOT ALL TESTS IN THE SAME FILE
  // give appropriate tests files names
});
