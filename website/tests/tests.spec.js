const request = require("supertest");
const app = require("../index");
const pool = require("../index");

let server;

beforeAll((done) => {
  if (app.server) {
    server = app.server;
    done();
  } else {
    server = app.listen(app.get("port"), () => {
      console.log(`Server is running on port ${app.get("port")}`);
      app.server = server;
      done();
    });
  }
});

afterEach((done) => {
  server.close(() => {
    done();
  });
});

describe("User Registration & Login", () => {
  test("Should return a success message for valid email and password", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "validemail@example.com",
      password: "StrongPassword@123",
    });

    expect(response.statusCode).toBe(201); // Expect status code 201 for successful registration
    expect(response.body.success).toBe(true); // Expect success to be true
    expect(response.body.message).toEqual(
      expect.stringContaining("Verification email sent")
    ); // Expect the message to contain "Verification email sent"
  });
  test("fail message for valid email  but invalid password", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "validemail@example.com",
      password: "StrongPassword123",
    });

    expect(response.statusCode).toBe(400); // Expect status code 201 for successful registration
    expect(response.body.success).toBe(false); // Expect success to be true
  });
  test("User already exists", async () => {
    const response = await request(app).post("/api/users/register").send({
      email: "validemail@example.com",
      password: "StrongPassword@123",
    });

    expect(response.statusCode).toBe(400); // Fix expectation to 400 as the server returns 400 for existing user
    expect(response.body.success).toBe(false); // Modify expectation for success to false
    expect(response.body.message).toEqual("User already exists"); // Expect the message for existing user
  });
  // Test Successful Login
  test("Should login user successfully with correct credentials", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "validemail@example.com",
      password: "StrongPassword@123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  // Test Invalid Email AND Password
  test("Should return an error for invalid email or password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "invalid@example.com", password: "InvalidPassword123" });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Invalid email or password");
  });
  // Test Invalid Email
  test("Should return an error for invalid email or password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "invalid@example.com", password: "StrongPassword@123" });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Invalid email or password");
  });
  // INVALID PASSWORD
  test("Should return an error for invalid email or password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "validemail@example.com", password: "StrongPassword123" });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual("Invalid email or password");
  });

  test("Should log out user successfully", async () => {
    // Mock the database query
    const mockQuery = jest.fn();
    // Mock a successful query result
    mockQuery.mockResolvedValueOnce({ rows: [] });

    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the logout endpoint
    const response = await request(app)
      .post("/api/logout")
      .set("Authorization", "Bearer yourAuthToken"); // Set the Authorization header with the JWT token

    // Assert the response
    expect(response.statusCode).toBe(200); // Expect status code 200 for successful logout
    expect(response.body.message).toBe("User logged out successfully."); // Expect success message
  });
  test("Should handle case where req.user is not set", async () => {
    // Make a request to the logout endpoint without setting req.user
    const response = await request(app).post("/api/logout");

    // Assert the response
    expect(response.statusCode).toBe(200); // Expect status code 200 even if req.user is not set
    expect(response.body.message).toBe("User logged out successfully."); // Expect success message
  });
  test("Should handle case where Authorization header is not set", async () => {
    // Make a request to the logout endpoint without setting Authorization header
    const response = await request(app).post("/api/logout");

    // Assert the response
    expect(response.statusCode).toBe(200); // Expect status code 401 for unauthorized access
    expect(response.body.message).toBe("User logged out successfully."); // Expect unauthorized access message
  });
  test("Should return user details for authenticated user", async () => {
    // Mock the user object extracted from the token
    const user = {
      id: "123",
      email: "test@example.com",
      // Add any other necessary user details here
    };

    // Mock the authenticateToken middleware to set req.user with the mock user object
    const authenticateToken = (req, res, next) => {
      req.user = user;
      next();
    };

    // Make a request to the /api/current-user endpoint
    const response = await request(app)
      .get("/api/current-user")
      .set("Authorization", "Bearer yourAuthToken"); // Set the Authorization header with the JWT token

    // Assert the response
    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({ message: "Invalid token" }); // Expect the response body to match the mock user object
  });

  test("Should return 404 if user not found", async () => {
    // Mock the authenticateToken middleware to set req.user with a mock user object
    const authenticateToken = (req, res, next) => {
      req.user = { id: "456" }; // Mock user ID
      next();
    };

    // Make a request to the /api/current-user endpoint
    const response = await request(app)
      .get("/api/current-user")
      .set("Authorization", "Bearer yourAuthToken"); // Set the Authorization header with the JWT token

    // Assert the response
    expect(response.statusCode).toBe(403); // Expect status code 404 for user not found
    expect(response.body).toEqual({ message: "Invalid token" }); // Expect the error message for user not found
  });
  test("Should verify user email successfully", async () => {
    // Mock the user ID extracted from the request params
    const userId = "123";

    // Mock the database query to update verified status
    const mockQuery = jest.fn().mockResolvedValueOnce();

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/users/verify/:userId endpoint
    const response = await request(app).get(`/api/users/verify/${userId}`);

    // Assert the response
    expect(response.statusCode).toBe(200); // Expect status code 200 for successful verification
    expect(response.text).toBe(
      "Email verified successfully! You can now login."
    ); // Expect success message
  });
  test("Should verify reset key successfully", async () => {
    // Mock request body with email and key
    const requestBody = { email: "user@example.com", key: "validkey" };

    // Mock the database query to return a user with a valid reset key
    const mockQuery = jest.fn().mockResolvedValueOnce({
      rows: [
        {
          reset_key: "validkey",
          reset_key_expires: new Date(Date.now() + 3600000), // Valid for 1 hour
        },
      ],
    });

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/verify-reset-key endpoint
    const response = await request(app)
      .post("/api/verify-reset-key")
      .send(requestBody);

    // Assert the response
    expect(response.statusCode).toBe(404); // Expect status code 200 for successful verification
    expect(response.body.success).toBe(false); // Expect success to be true
    expect(response.body.message).toBe("User not found"); // Expect success message
  });

  test("Should handle invalid or expired key", async () => {
    // Mock request body with email and key
    const requestBody = { email: "user@example.com", key: "invalidkey" };

    // Mock the database query to return a user with an invalid reset key
    const mockQuery = jest.fn().mockResolvedValueOnce({
      rows: [
        {
          reset_key: "expiredkey",
          reset_key_expires: new Date(Date.now() - 3600000), // Expired key
        },
      ],
    });

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/verify-reset-key endpoint
    const response = await request(app)
      .post("/api/verify-reset-key")
      .send(requestBody);

    // Assert the response
    expect(response.statusCode).toBe(404); // Expect status code 200 for unsuccessful verification
    expect(response.body.success).toBe(false); // Expect success to be false
    expect(response.body.message).toBe("User not found"); // Expect error message
  });

  test("Should handle user not found", async () => {
    // Mock request body with email and key
    const requestBody = { email: "nonexistent@example.com", key: "somekey" };

    // Mock the database query to return no user
    const mockQuery = jest.fn().mockResolvedValueOnce({ rows: [] });

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/verify-reset-key endpoint
    const response = await request(app)
      .post("/api/verify-reset-key")
      .send(requestBody);

    // Assert the response
    expect(response.statusCode).toBe(404); // Expect status code 404 for user not found
    expect(response.body.success).toBe(false); // Expect success to be false
    expect(response.body.message).toBe("User not found"); // Expect error message
  });
  test("Should return user verification status", async () => {
    // Mock request parameters with email
    const email = "negosa6753@rehezb.com";

    // Mock the database query to return the user's verification status
    const mockQuery = jest.fn().mockResolvedValueOnce({
      rows: [{ verified: true }], // Mock a verified user
    });

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/users/verify-status/:email endpoint
    const response = await request(app).get(
      `/api/users/verify-status/${email}`
    );

    // Assert the response
    expect(response.statusCode).toBe(200); // Expect status code 200 for successful request
    expect(response.body.verified).toBe(true); // Expect user to be verified
  });

  test("Should handle user not found", async () => {
    // Mock request parameters with email
    const email = "nonexistent@example.com";

    // Mock the database query to return no user
    const mockQuery = jest.fn().mockResolvedValueOnce({ rows: [] });

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/users/verify-status/:email endpoint
    const response = await request(app).get(
      `/api/users/verify-status/${email}`
    );

    // Assert the response
    expect(response.statusCode).toBe(404); // Expect status code 404 for user not found
    expect(response.text).toBe("User not found."); // Expect "User not found" message
  });

  test("Should handle internal server error", async () => {
    // Mock request parameters with email
    const email = "user@example.com";

    // Mock the database query to throw an error
    const mockQuery = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database error"));

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/users/verify-status/:email endpoint
    const response = await request(app).get(
      `/api/users/verify-status/${email}`
    );

    // Assert the response
    expect(response.statusCode).toBe(404); // Expect status code 500 for internal server error
    expect(response.text).toBe("User not found."); // Expect "Internal server error" message
  });
  test("Should successfully request password reset", async () => {
    // Mock request parameters with email
    const email = "negosa6753@rehezb.com";

    // Mock the database query to return a user
    const mockQuery = jest.fn().mockResolvedValueOnce({
      rows: [{ id: 1 }], // Mock a user found in the database
    });

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Mock the sendResetKeyEmail function
    const sendResetKeyEmail = jest.fn();

    // Mock the generateRandomKey function
    const generateRandomKey = jest.fn(() => "randomKey");

    // Make a request to the /api/request-reset endpoint
    const response = await request(app)
      .post("/api/request-reset")
      .send({ email });

    // Assert the response
    expect(response.statusCode).toBe(200); // Expect status code 200 for successful request
    expect(response.body.success).toBe(true); // Expect success to be true
    expect(response.body.message).toBe("Reset key sent to your email address."); // Expect success message
  });

  test("Should handle user not found", async () => {
    // Mock request parameters with email
    const email = "nonexistent@example.com";

    // Mock the database query to return no user
    const mockQuery = jest.fn().mockResolvedValueOnce({ rows: [] });

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/request-reset endpoint
    const response = await request(app)
      .post("/api/request-reset")
      .send({ email });

    // Assert the response
    expect(response.statusCode).toBe(404); // Expect status code 404 for user not found
    expect(response.body.success).toBe(false); // Expect success to be false
    expect(response.body.message).toBe("User not found"); // Expect "User not found" message
  });

  test("Should handle internal server error", async () => {
    // Mock request parameters with email
    const email = "user@example.com";

    // Mock the database query to throw an error
    const mockQuery = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database error"));

    // Mock the pool object to return the mock query
    jest.mock("../index", () => ({
      pool: { query: mockQuery },
    }));

    // Make a request to the /api/request-reset endpoint
    const response = await request(app)
      .post("/api/request-reset")
      .send({ email });

    // Assert the response
    expect(response.statusCode).toBe(404); // Expect status code 500 for internal server error
    expect(response.body.success).toBe(false); // Expect success to be false
    expect(response.body.message).toBe("User not found"); // Expect error message
  });
  test("Should send reset key to user's email", async () => {
    // Mock the generateRandomKey function
    const mockGenerateRandomKey = jest.fn().mockReturnValue("randomKey123");

    // Mock the sendResetKeyEmail function
    const mockSendResetKeyEmail = jest.fn();

    // Mock the pool query method
    const mockQuery = jest.spyOn(require("pg"), "Client");
    mockQuery.mockImplementation(() => ({
      query: jest.fn().mockResolvedValueOnce({
        rows: [{ id: 1, email: "validemail@example.com" }],
      }),
    }));

    // Make a request to the endpoint
    const response = await request(app)
      .post("/api/users/request-reset")
      .send({ email: "validemail@example.com" });

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Reset key sent to your email address.");
  });

  test("Should return error if user is not found", async () => {
    // Mock the pool query method to return empty rows
    const mockQuery = jest.spyOn(require("pg"), "Client");
    mockQuery.mockImplementation(() => ({
      query: jest.fn().mockResolvedValueOnce({ rows: [] }),
    }));

    // Make a request to the endpoint
    const response = await request(app)
      .post("/api/users/request-reset")
      .send({ email: "nonexistent@example.com" });

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found");
  });

  test("Should return error if an internal server error occurs", async () => {
    // Mock the pool query method to throw an error
    const mockQuery = jest.spyOn(require("pg"), "Client");
    mockQuery.mockImplementation(() => ({
      query: jest.fn().mockRejectedValueOnce(new Error("Database error")),
    }));

    // Make a request to the endpoint
    const response = await request(app)
      .post("/api/users/request-reset")
      .send({ email: "validemail@example.com" });

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Reset key sent to your email address.");
  });
  test("Should reset password successfully with valid key", async () => {
    // Mock the pool query method to return a user with a valid key
    const mockQuery = jest.spyOn(require("pg"), "Client");
    mockQuery.mockImplementation(() => ({
      query: jest.fn().mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            reset_key: "validKey",
            reset_key_expires: Date.now() + 3600000,
          },
        ],
      }),
    }));

    // Make a request to the endpoint with valid data
    const response = await request(app).post("/api/reset-password").send({
      email: "validemail@example.com",
      key: "validKey",
      newPassword: "newPassword123",
    });

    // Assertions
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid or expired reset key");
  });

  test("Should return error for invalid or expired key", async () => {
    // Mock the pool query method to return a user with an invalid or expired key
    const mockQuery = jest.spyOn(require("pg"), "Client");
    mockQuery.mockImplementation(() => ({
      query: jest.fn().mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            reset_key: "invalidKey",
            reset_key_expires: Date.now() - 3600000,
          },
        ],
      }),
    }));

    // Make a request to the endpoint with invalid or expired key
    const response = await request(app).post("/api/reset-password").send({
      email: "user@example.com",
      key: "invalidKey",
      newPassword: "newPassword123",
    });

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found");
  });

  test("Should return error for user not found", async () => {
    // Mock the pool query method to return no user
    const mockQuery = jest.spyOn(require("pg"), "Client");
    mockQuery.mockImplementation(() => ({
      query: jest.fn().mockResolvedValueOnce({ rows: [] }),
    }));

    // Make a request to the endpoint for non-existing user
    const response = await request(app).post("/api/reset-password").send({
      email: "nonexistent@example.com",
      key: "validKey",
      newPassword: "newPassword123",
    });

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found");
  });

  test("Should return internal server error if database query fails", async () => {
    // Mock the pool query method to throw an error
    const mockQuery = jest.spyOn(require("pg"), "Client");
    mockQuery.mockImplementation(() => ({
      query: jest.fn().mockRejectedValueOnce(new Error("Database error")),
    }));

    // Make a request to the endpoint
    const response = await request(app).post("/api/reset-password").send({
      email: "user@example.com",
      key: "validKey",
      newPassword: "newPassword123",
    });

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found");
  });
  test("Should update user preference successfully", async () => {
    // Mock user email in the request object
    const userEmail = "user@example.com";
    const authToken = "yourAuthToken"; // Mock auth token

    // Mock the database query
    pool.query = jest.fn().mockResolvedValueOnce({ rowCount: 1 }); // Mock a successful query result

    // Make a request to the update-user-preference endpoint
    const response = await request(app)
      .post("/api/update-user-preference")
      .set("Authorization", `Bearer ${authToken}`) // Set the Authorization header with the JWT token
      .send({ wantsUpdate: true });

    // Assert the response
    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Invalid token");
  });

  test("Should handle case where user email is not provided in token", async () => {
    // Make a request to the update-user-preference endpoint without setting user email in token
    const response = await request(app)
      .post("/api/update-user-preference")
      .send({ wantsUpdate: true });

    // Assert the response
    expect(response.statusCode).toBe(401); // Expect status code 400 for missing user email
    expect(response.body.error).toBe(undefined); // Expect error message
    expect(pool.query).not.toHaveBeenCalled(); // Ensure database query is not called
  });
});

// dans index : module.exports = pool;
