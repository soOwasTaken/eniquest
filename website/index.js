require("dotenv").config(); // at the top of your file
const crypto = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = 3000;
const filePath = "data.json";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const url = require("url");
const path = require("path");
// Parse the PostgreSQL connection URL
const databaseUrl = process.env.DATABASE_URL; // Set this environment variable with the PostgreSQL connection URL
const params = url.parse(databaseUrl);
const auth = params.auth.split(":");

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  // ssl: {
  //   rejectUnauthorized: true // Ensure SSL verification is enabled
  // }
};

const pool = new Pool(config);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database:", res.rows[0].now);
  }
});

// Create a connection pool
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); // No token found in the request headers
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid token' }); // Token is not valid
    }
    console.log("Decoded JWT:", decoded); // Log the decoded JWT for debugging

    // Attach the decoded token to the request as the user object
    req.user = { id: decoded.userId, email: decoded.email };
    next(); // Proceed to the next middleware
  });
}



app.use(bodyParser.json()); // to parse JSON body
//app.use(express.static('public')); // if your frontend files are in 'public' directory
app.use(express.static(path.join(__dirname, "./frontend/dist")));

console.log(__dirname);
// Route to serve the frontend application
app.get("/", (req, res) => {
  /* res.json("TESTING") */
  res.sendFile(path.join(__dirname, "./frontend/dist/", "index.html"));
});
app.get("/about", (req, res) => {
  /* res.json("TESTING") */
  res.sendFile(path.join(__dirname, "./frontend/dist/", "index.html"));
});
app.get("/app*", (req, res) => {
  /* res.json("TESTING") */
  res.sendFile(path.join(__dirname, "./frontend/dist/", "index.html"));
});
app.get("/auth", (req, res) => {
  /* res.json("TESTING") */
  res.sendFile(path.join(__dirname, "./frontend/dist/", "index.html"));
});

app.post("/processPrompt", authenticateToken, async (req, res) => {
  const userContent = req.body.content; // Extract the user's input sent from frontend

  if (userContent.length < 15) {
    res.json({ summary: "Sorry, your answer is too short...", scoreResult: 0 });
    return;
  }

  let data = JSON.stringify({
    model: "open-mistral-7b",
    messages: [
      {
        role: "user",
        content:
          "A user is asked about the limit of free speech : Please rate his answer based on the Implications question on a scale of 0 to 10 based on the criteria of reasoning quality, ethical considerations, respect for diversity, example relevance, and insight into implications. brief explanation in 5 words or less:'" +
          userContent +
          "'\nCriteria:\n1)Reasoning Quality: Does the response demonstrate clear, a sentence, and logical reasoning?\n2)Ethical Consideration: How does the response deal with ethical implications?\n3)Respect for Diversity: Does the response acknowledge and respect diverse viewpoints?\nExample Relevance: How relevant and illustrative are the examples provided?\nInsight into Implications: Does the response discuss the implications of where free speech stops?\nYou should always use this specific pattern\nScore: [Insert x/10]\nSummary: [Insert a concise sentence (max. 5 words) capturing the essence of the evaluation]\n",
      },
    ],
    temperature: 0.7,
    top_p: 1,
    max_tokens: 128,
    stream: false,
    safe_prompt: false,
    random_seed: 1337,
  });

  let config = {
    method: "post",
    url: "https://api.mistral.ai/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`, // Use dotenv to securely use your API key
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      const content = response.data.choices[0].message.content;
      const result = processEntryById(content, response.data.id, req.user.email);
      const userOutput = userContent; // Assuming this is what you meant by user output
      const totalTokens =
        response.data.usage.prompt_tokens +
        response.data.usage.total_tokens +
        response.data.usage.completion_tokens;
      const messageContent = response.data.choices[0].message.content; // Adjust according to the actual response structure
      const dataToStore = {
        id: response.data.id,
        userOutput: userOutput,
        totalTokens: totalTokens,
        messageContent: messageContent,
      };

      // Append to a file

      fs.appendFile("data.json", JSON.stringify(dataToStore) + ",\n", (err) => {
        if (err) throw err;
        console.log("Data appended to file!");
        processLatestEntry();
      });

      if (result) {
        // Now we include both the score and summary in our response to the frontend
        res.json({ summary: result.summary, scoreResult: result.scoreResult });
      } else {
        res.json({
          summary:
            "Sorry, we didn't understand your answer. Press the enter key again or try another answer.",
          scoreResult: 0,
        });
        return;
      }
    })
    .catch((error) => {
      console.log(error);
      /* res.status(500).send("Error processing the prompt"); */
      res.json({
        summary:
          "Sorry, we didn't understand your answer. Press the enter key again or try another answer.",
        scoreResult: 0,
      });
    });
});

// ----------------------------------------------------------------------------
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/// THIS IS WHERE WE CHECK ALL GAMES ANSWERS ///

///BRAILLE///
app.post("/checkIndex", authenticateToken, async (req, res) => {
  const { index } = req.body;
  if (index === 57) {
    try {
      await updateUserLevel(4, req.user.email);
      console.log("User level updated successfully");
      res.json({ result: true, feedback: "Level updated to 4." });
    } catch (error) {
      console.error("Failed to update user level:", error);
      res.status(500).json({ error: "Failed to update user level" });
    }
  } else {
    res.json({ result: false, feedback: "Incorrect index." });
  }
});


app.post("/checkOrder", authenticateToken, async (req, res) => {
  const { game, order } = req.body;

  // Example game check:
  if (game === "game2") {
    const correctPhrase = "I disapprove of what you say, but I will defend to the death your right to say it";
    const userAnswer = order.trim().replace(/\.$/, "").toLowerCase();

    const correctAnswer = correctPhrase.toLowerCase().replace(/\.$/, "");

    if (userAnswer === correctAnswer || userAnswer === correctAnswer2) {
      try {
        await updateUserLevel(3, req.user.email);  // Using email to update level
        res.json({ feedback: "Correct! The phrase matches exactly." });
      } catch (error) {
        console.error("Failed to update user level:", error);
        res.status(500).json({ error: "Failed to update user level" });
      }
    } else {
      res.json({ feedback: "Incorrect. Please try again." });
    }
  }
  /// TERMINAL GAME //
  else if (game === "game1") {
    // Define the correct answer array for the second game
    const correctAnswer = [
      "Elysir",
      "Xerxes",
      "Pyrothia",
      "Aetheria",
      "Emberfell",
    ];

    // Split the user's input into an array of names
    const userAnswer = order.trim().toLowerCase().split(" ");

    // Check if the user's answer contains all the correct names
    const correctNames = correctAnswer.filter((name) =>
      userAnswer.includes(name.toLowerCase())
    );
    const incorrectNames = correctAnswer.filter(
      (name) => !userAnswer.includes(name)
    );

    // Send the appropriate feedback to the client
    if (correctNames.length === 5) {
      res.json({ feedback: "Correct!" });
      updateUserLevel(6, req.user.email);
    } else if (correctNames.length > 0) {
      res.json({
        feedback: `Partial correct. You only got ${
          correctNames.length
        } correct planets: ${correctNames.join(", ")}. Try again! 😉`,
      });
    } else {
      res.json({ feedback: "Incorrect. Please try again." });
    }
  }
  /// PUZZLE GAME ///
  else if (game === "game4") {
    // Define the correct answer for the third game
    const correctAnswer = "4891";

    // Check if the user input matches the correct answer
    if (order === correctAnswer) {
      res.json({ feedback: "Correct! You've solved the puzzle." });
      updateUserLevel(5, req.user.email);
    } else {
      res.json({ feedback: "Incorrect." });
    }
  }
  /// BRAILLE GAME  ///
  else if (game === "game3") {
    // to do
  }
  /// MUSIC PLAYER ///
  else if (game === "game5") {
    const expectedString =
      "beautiful! in the realm of music, freedom knows no bounds!";
    const alternativeString =
      "thank you from the bottom of my heart. please continue to enjoy my rampaging music!!!";
    const alternativeString2 = "Thanks for the lovely words 🫶";

    if (
      order === expectedString.toLowerCase() ||
      order === alternativeString.toLowerCase() ||
      order === alternativeString2.toLowerCase()
    ) {
      res.json({ feedback: "Well done" });
      updateUserLevel(2, req.user.email);
    } else {
      res.json({ feedback: "Wrong... Try again." });
    }
  }
  /// AI GENERATED IMAGE GAME ///
  else if (game === "game6") {
    // TO DO
  } else {
    res.status(400).json({ error: "Invalid game identifier." });
  }
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// -------------------------------------------------------------------------

// Dummy database for users (you'll replace this with a real database)
let users = [];

// Save users data to JSON file
function saveUsersToFile() {
  fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error saving users data:", err);
    } else {
      console.log("Users data saved to users.json");
    }
  });
}

// Load users data from JSON file (if exists)
// fs.readFile("users.json", "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading users data:", err);
//   } else {
//     try {
//       users = JSON.parse(data);
//       console.log("Users data loaded from users.json");
//     } catch (parseError) {
//       console.error("Error parsing users data:", parseError);
//     }
//   }
// });

////////////////////////////// JSON FILE LOGIN && REGISTER ///////////////////////////////////////////////////////////
// Login endpoint
// app.post("/api/users/login", (req, res) => {
//   const { email, password } = req.body;

//   // Find user by email
//   const user = users.find((user) => user.email === email);

//   // If user not found or password doesn't match, return error
//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Invalid email or password" });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//     expiresIn: "1h", // Token expires in 1 hour
//   });

//   // Return token to client
//   res.json({ success: true, token });
//   if (user.verified) {
//     user.loggedin = true;
//     console.log(user.email, " is logged in");
//   } else {
//     user.loggedin = false;
//     console.log("needs to be verify: ", user.email);
//   }
//   saveUsersToFile();
//   currentUser = user;
//   console.log(" current user: ", user);
// });

// // Register endpoint
// app.post("/api/users/register", async (req, res) => {
//   const { email, password } = req.body;

//   // Check if user already exists
//   if (users.find((user) => user.email === email)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "User already exists" });
//   }

//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const userId = Math.random().toString(36).substr(2, 9);

//   const newUser = { id: userId, email, password: hashedPassword };
//   newUser.verified = false;
//   newUser.level = 0;

//   const verificationLink = `http://localhost:${port}/api/users/verify/${userId}`; // You might want to adjust this to your actual domain

//   await sendVerificationEmail(email, verificationLink);
//   currentUser = newUser;
//   users.push(newUser);

//   saveUsersToFile();

//   res.status(201).json({
//     success: true,
//     message:
//       "Verification email sent. Please check your email to complete registration.",
//   });
// });
/////////////////////// DATABASE LOGIN && REGISTER //////////////////////////////////////

// Login endpoint
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    // If user not found or password doesn't match, return error
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // Adding email to the token payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Update loggedin status in the database
    if (user.verified) {
      await pool.query("UPDATE users SET loggedin = true WHERE id = $1", [
        user.id,
      ]);
      console.log(user.email, " is logged in");
    }

    // Return token to client
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const baseUrl = process.env.API_BASE_URL || "";
// Register endpoint
app.post("/api/users/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Generate unique user ID
    const userId = Math.random().toString(36).substr(2, 9);

    // Insert new user into the database
    await pool.query(
      "INSERT INTO users (id, email, password, verified, level, loggedin) VALUES ($1, $2, $3, $4, $5, $6)",
      [userId, email, hashedPassword, false, 0, false]
    );

    // Send verification email (assuming this function is defined elsewhere)

    const verificationLink = `${baseUrl}/api/users/verify/${userId}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({
      success: true,
      message:
        "Verification email sent. Please check your email to complete registration.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

///////////////////// JSON LOGOUT , CURRENT USER,  VERIFY ID, VERIFY STATUS ///////////////
// // Define a route handler for setting user.loggedin to false
// app.post("/api/logout", (req, res) => {
//   // Assuming you have access to the currentUser object
//   currentUser.loggedin = false;
//   saveUsersToFile();
//   console.log(currentUser.email, " has logged out");
//   res.json({ message: "User logged out successfully." });
// });

// app.get("/api/current-user", (req, res) => {
//   res.json(currentUser);
// });

// app.get("/api/users/verify/:userId", (req, res) => {
//   const { userId } = req.params;
//   const user = users.find((user) => user.id === userId);

//   if (!user) {
//     return res.status(404).send("User not found.");
//   }

//   user.verified = true; // Add a verified property to the user
//   saveUsersToFile();

//   res.send("Email verified successfully! You can now login.");
// });

// app.get("/api/users/verify-status/:email", (req, res) => {
//   const { email } = req.params;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(404).send("User not found.");
//   }

//   res.json({ verified: user.verified || false });
// });

////////////////////////// DATABASE LOGOUT , CURRENT USER,  VERIFY ID, VERIFY STATUS ///////////////
// Define a route handler for setting user.loggedin to false
app.post("/api/logout", async (req, res) => {
  try {
    // Update loggedin status in the database
    if (req.user)
      await pool.query("UPDATE users SET loggedin = false WHERE id = $1", [
        req.user.id,
      ]);

    if (req.user) console.log(req.user.email, " has logged out");
    res.json({ message: "User logged out successfully." });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get current user from database

// app.get("/api/current-user", (req, res) => {
//   console.log(currentUser);
//   res.json(currentUser);
// });
app.get("/api/current-user", authenticateToken, async (req, res) => {
  console.log('Current user:', req.user); // This will log the user information extracted from the token

  try {
    // Query the database to fetch user details using the user ID extracted from the token
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);

    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Verify user email based on userId

app.get(`/api/users/verify/:userId`, async (req, res) => {
  const { userId } = req.params;

  try {
    // Update verified status in the database
    await pool.query("UPDATE users SET verified = true WHERE id = $1", [
      userId,
    ]);

    res.send("Email verified successfully! You can now login.");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal server error");
  }
});

// Get verification status of a user by email
app.get("/api/users/verify-status/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Query the database to get the user's verification status
    const result = await pool.query(
      "SELECT verified FROM users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.json({ verified: user.verified || false });
  } catch (error) {
    console.error("Error checking verification status:", error);
    res.status(500).send("Internal server error");
  }
});

function processLatestEntry() {
  const filePath = "data.json";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(`[${data.slice(0, -2)}]`);
      const lastEntry = jsonData[jsonData.length - 1]; // Assuming you want to process the last entry

      // Now process this entry as needed
      // For example, finding by ID would be replaced by just using lastEntry directly
      const result = processEntryById(lastEntry.messageContent, lastEntry.id);
      if (result) {
        console.log(`${result.scoreResult}, ${result.summary}`);
      }
    } catch (parseError) {
      console.error("Error parsing JSON from file:", parseError);
    }
  });
}

/////////////// JSON FILE UPDATELEVEL AND PROCESSENTRYBYiD///////////////////////////////////////////////////
// function updateUserLevel(level) {
//   // Find the index of the user with the same email
//   const existingUserIndex = users.findIndex(
//     (user) => user.email === currentUser.email
//   );

//   // If a user with the same email is found, remove it
//   if (existingUserIndex !== -1) {
//     users.splice(existingUserIndex, 1);
//   }
//   currentUser.level = level;
//   // Add the new user to the array
//   users.push(currentUser);
//   saveUsersToFile();
//   console.log(currentUser);
// }
function processEntryById(content, id, userEmail) {
  console.log("Content received for processing:", content); // Debug: log the content

  const scoreRegex = /Score: (\d+)\/10/;
  const summaryRegex = /[^:]*:[^:]*: ([^\.]*)\./;

  const scoreMatch = content.match(scoreRegex);
  const summaryMatch = content.match(summaryRegex);

  if (scoreMatch && summaryMatch) {
    const score = parseInt(scoreMatch[1], 10);
    const summary = summaryMatch[1].trim();
    const scoreResult = score >= 6 ? 1 : 0;
    if (scoreResult === 1) {
      updateUserLevel(1, userEmail);  // Now using userEmail passed to the function
    }

    return { scoreResult, summary };
  } else {
    console.error("Pattern not found in content");
    return null;
  }
}

//////////////////////////// DATABASE UPDATE LEVEL AND PROCESSENTRYBYID /////////////////////////////
async function updateUserLevel(level, email) {
  console.log(`Attempting to update user level to ${level} for user with email ${email}`);
  try {
    const res = await pool.query("UPDATE users SET level = $1 WHERE email = $2", [level, email]);
    if (res.rowCount > 0) {
      console.log(`User level updated successfully for email: ${email}`);
    } else {
      console.log(`No user found with email: ${email}`);
    }
  } catch (error) {
    console.error("Error updating user level:", error);

    throw error;  // It's a good practice to re-throw the error if you catch it in a function like this, especially if you need the calling function to know that an error occurred.
  }
}

// async function processEntryById(content, id) {
//   console.log("Content received for processing:", content); // Debug: log the content

//   const scoreRegex = /Score: (\d+)\/10/;
//   const summaryRegex = /[^:]*:[^:]*: ([^\.]*)\./;

//   const scoreMatch = content.match(scoreRegex);
//   const summaryMatch = content.match(summaryRegex);

//   if (scoreMatch && summaryMatch) {
//     const score = parseInt(scoreMatch[1], 10);
//     const summary = summaryMatch[1].trim();
//     const scoreResult = score >= 6 ? 1 : 0;

//     // Check and update user's level
//     if (scoreResult === 1 && currentUser.level < 1) {
//       await updateUserLevel(1);
//     }

//     return { scoreResult, summary };
//   } else {
//     console.error("Pattern not found in content");
//     return null;
//   }
// }

async function sendVerificationEmail(email, verificationLink) {
  const apiKey = process.env.API_EMAIL;
  const subject = encodeURIComponent("Verify Your Email Address");
  const from = encodeURIComponent("444deph12@gmail.com");
  const fromName = encodeURIComponent("Your Company Name");
  const bodyHtml = encodeURIComponent(
    `<html><body>Please verify your email by clicking on this link: <a href="${verificationLink}">Verify Email</a></body></html>`
  );

  const url = `https://api.elasticemail.com/v2/email/send?apikey=${apiKey}&subject=${subject}&from=${from}&fromName=${fromName}&to=${encodeURIComponent(
    email
  )}&bodyHtml=${bodyHtml}&isTransactional=true`;

  try {
    const response = await axios.get(url);
    console.log("Email sent!", response.data);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

// password change

function generateRandomKey() {
  return crypto.randomBytes(3).toString("hex").toUpperCase(); // Generates a 6-character hexadecimal string
}

/////////////////// JSON USEEERRRSS  REQUEST-RESET ///////////////////////////////
// app.post("/api/users/request-reset", async (req, res) => {
//   const { email } = req.body;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   // Generate and store the reset key
//   const resetKey = generateRandomKey();
//   user.resetKey = resetKey;
//   user.resetKeyExpires = Date.now() + 3600000; // Key expires in 1 hour

//   await sendResetKeyEmail(user.email, resetKey);

//   saveUsersToFile(); // Assuming you have a function to save the state

//   res.json({ success: true, message: "Reset key sent to your email address." });
// });

///////////////////// DATABASE REQUEST RESET ///////////////////////////////////////////
app.post("/api/users/request-reset", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email in the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate and store the reset key
    const resetKey = generateRandomKey();
    await pool.query(
      "UPDATE users SET reset_key = $1, reset_key_expires = $2 WHERE id = $3",
      [resetKey, Date.now() + 3600000, user.id]
    );

    // Send the reset key via email
    await sendResetKeyEmail(user.email, resetKey);

    res.json({
      success: true,
      message: "Reset key sent to your email address.",
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to request password reset." });
  }
});

async function sendResetKeyEmail(email, key) {
  const apiKey = process.env.API_EMAIL;
  const subject = encodeURIComponent("Your Password Reset Key");
  const from = encodeURIComponent("444deph12@gmail.com");
  const fromName = encodeURIComponent("Your Company Name");
  const bodyHtml = encodeURIComponent(
    `<html><body>Your password reset key is: <strong>${key}</strong>. It expires in 1 hour.</body></html>`
  );

  const url = `https://api.elasticemail.com/v2/email/send?apikey=${apiKey}&subject=${subject}&from=${from}&fromName=${fromName}&to=${encodeURIComponent(
    email
  )}&bodyHtml=${bodyHtml}&isTransactional=true`;

  try {
    const response = await axios.get(url);
    console.log("Reset key email sent!", response.data);
  } catch (error) {
    console.error("Failed to send reset key email:", error);
  }
}

///////////////////////// JSON VERIFYRESETKEY, REQUESTRESET, RESETPASSWORD, UPDATE USER PREFERECE ////////////////////////////

// // Endpoint to verify the reset key
// app.post("/api/verify-reset-key", (req, res) => {
//   const { email, key } = req.body;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   const isKeyValid = user.resetKey === key && user.resetKeyExpires > Date.now();

//   if (isKeyValid) {
//     res.json({ success: true, message: "Key is valid" });
//   } else {
//     res.json({ success: false, message: "Invalid or expired key" });
//   }
// });

// app.post("/api/request-reset", async (req, res) => {
//   const { email } = req.body;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }
//   console.log("key genered");
//   const resetKey = generateRandomKey();
//   user.resetKey = resetKey;
//   user.resetKeyExpires = Date.now() + 3600000; // Key expires in 1 hour

//   try {
//     await sendResetKeyEmail(user.email, resetKey);
//     saveUsersToFile(); // Save state, assuming you have this function

//     res.json({
//       success: true,
//       message: "Reset key sent to your email address.",
//     });
//   } catch (error) {
//     console.error("Failed to send reset key email:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to send reset key email." });
//   }
// });

// app.post("/api/reset-password", async (req, res) => {
//   const { email, key, newPassword } = req.body;
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   if (user.resetKey === key && user.resetKeyExpires > Date.now()) {
//     const hashedPassword = bcrypt.hashSync(newPassword, 10);
//     user.password = hashedPassword;
//     delete user.resetKey;
//     delete user.resetKeyExpires;

//     saveUsersToFile();

//     res.json({
//       success: true,
//       message: "Password has been reset successfully.",
//     });
//   } else {
//     res
//       .status(400)
//       .json({ success: false, message: "Invalid or expired reset key" });
//   }
// });

// app.post("/api/update-user-preference", (req, res) => {
//   const { wantsUpdate } = req.body;

//   if (currentUser) {
//     currentUser.wantsUpdate = wantsUpdate;
//     saveUsersToFile();
//     res.json({ message: "User preference updated successfully." });
//   } else {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// });

///////////////////////// DATABASE VERIFYRESETKEY, REQUESTRESET, RESETPASSWORD, UPDATE USER PREFERECE ////////////////////////////

// Endpoint to verify the reset key
app.post("/api/verify-reset-key", async (req, res) => {
  const { email, key } = req.body;

  try {
    // Find the user by email in the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isKeyValid =
      user.reset_key === key && user.reset_key_expires > Date.now();

    if (isKeyValid) {
      res.json({ success: true, message: "Key is valid" });
    } else {
      res.json({ success: false, message: "Invalid or expired key" });
    }
  } catch (error) {
    console.error("Error verifying reset key:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to verify reset key." });
  }
});

// Endpoint to request a password reset
app.post("/api/request-reset", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email in the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Key generated");
    const resetKey = generateRandomKey();
    await pool.query(
      "UPDATE users SET reset_key = $1, reset_key_expires = $2 WHERE id = $3",
      [resetKey, Date.now() + 3600000, user.id]
    );

    // Send the reset key via email
    await sendResetKeyEmail(email, resetKey);

    res.json({
      success: true,
      message: "Reset key sent to your email address.",
    });
  } catch (error) {
    console.error("Failed to request password reset:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to request password reset." });
  }
});

// Endpoint to reset password
app.post("/api/reset-password", async (req, res) => {
  const { email, key, newPassword } = req.body;

  try {
    // Find the user by email in the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.reset_key === key && user.reset_key_expires > Date.now()) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
        hashedPassword,
        user.id,
      ]);
      await pool.query(
        "UPDATE users SET reset_key = NULL, reset_key_expires = NULL WHERE id = $1",
        [user.id]
      );

      res.json({
        success: true,
        message: "Password has been reset successfully.",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset key" });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reset password." });
  }
});

// Endpoint to update user preference
app.post("/api/update-user-preference", authenticateToken, async (req, res) => {
  const { wantsUpdate } = req.body;

  try {
    // Ensure the user's email is attached to the request via the auth token
    if (!req.user.email) {
      return res.status(400).json({ error: "User email not provided in token" });
    }

    // Update user's wantsUpdate preference in the database based on their email
    await pool.query("UPDATE users SET wantsupdate = $1 WHERE email = $2", [
      wantsUpdate,
      req.user.email,
    ]);

    res.json({ message: "User preference updated successfully." });
  } catch (error) {
    console.error("Error updating user preference:", error);
    res.status(500).json({ error: "Failed to update user preference." });
  }
});


// server running
const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//////////////// JSON SET CURRENT USER LOGGEDIN TO FALSE WHEN SHUTING THE SERVER ////////////////
// process.on("SIGINT", () => {
//   server.close(() => {
//     fs.readFile("users.json", "utf8", (err, data) => {
//       if (err) {
//         console.error("Error reading users data:", err);
//       } else {
//         try {
//           users = JSON.parse(data);
//           users.forEach((user) => (user.loggedin = false));
//           saveUsersToFile();
//           console.log("Logged every user out");
//         } catch (parseError) {
//           console.error("Error parsing users data:", parseError);
//         }
//       }
//     });
//   });
// });

//////////////// DATABASE SET CURRENT USER LOGGEDIN TO FALSE WHEN SHUTING THE SERVER ////////////////
process.on("SIGINT", () => {
  server.close(async () => {
    try {
      // Update loggedin status of all users to false in the database
      await pool.query("UPDATE users SET loggedin = false");
      console.log("Logged out all users");
    } catch (error) {
      console.error("Error updating loggedin status:", error);
    } finally {
      // Exit the process
      process.exit(0);
    }
  });
});
