require("dotenv").config(); // at the top of your file
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = 3000;
const filePath = "data.json";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json()); // to parse JSON body
//app.use(express.static('public')); // if your frontend files are in 'public' directory

app.post("/processPrompt", async (req, res) => {
  const userContent = req.body.content; // Extract the user's input sent from frontend

  let data = JSON.stringify({
    model: "open-mistral-7b",
    messages: [
      {
        role: "user",
        content:
          "A user is asked about the limit of free speech : Please rate his answer based on the Implications question on a scale of 0 to 10 based on the criteria of reasoning quality, ethical considerations, respect for diversity, example relevance, and insight into implications. brief explanation in 7 words or less:'" +
          userContent +
          "'\nCriteria:\n1)Reasoning Quality: Does the response demonstrate clear and logical reasoning?\n2)Ethical Consideration: How does the response deal with ethical implications?\n3)Respect for Diversity: Does the response acknowledge and respect diverse viewpoints?\nExample Relevance: How relevant and illustrative are the examples provided?\nInsight into Implications: Does the response discuss the implications of where free speech stops?\nYou should always use this specific pattern\nScore: [Insert x/10]\nSummary: [Insert a concise sentence (max. 7 words) capturing the essence of the evaluation]\n", // Insert user input here
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
      const result = processEntryById(content, response.data.id);
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
        res.status(404).send("Summary not found");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error processing the prompt");
    });
});

// ----------------------------------------------------------------------------
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/// THIS IS WHERE WE CHECK ALL GAMES ANSWERS ///

///BRAILLE///
app.post("/checkIndex", (req, res) => {
  const { index } = req.body;

  if (index === 57) {
    res.json({ result: true });
    if (currentUser.level < 4) updateUserLevel(4);
  } else {
    res.json({ result: false });
  }
});

app.post("/checkOrder", (req, res) => {
  const { game, order } = req.body;

  /// WEB COMP ///
  if (game === "game2") {
    // Define the correct phrase for the first game
    const correctPhrase =
      "I disapprove of what you say, but I will defend to the death your right to say it";

    // Remove any trailing period from both user's answer and correct phrase
    const userAnswer = order.trim().replace(/\.$/, "").toLowerCase();
    const correctAnswer = correctPhrase.toLowerCase().replace(/\.$/, "");

    // Check if the provided string matches the correct phrase
    if (userAnswer === correctAnswer) {
      res.json({ feedback: "Correct! The phrase matches exactly." });
      if (currentUser.level < 3) updateUserLevel(3);
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
      if (currentUser.level < 6) updateUserLevel(6);
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
      if (currentUser.level < 5) updateUserLevel(5);
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

      if (currentUser.level < 2) updateUserLevel(2);
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
let currentUser;

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
fs.readFile("users.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading users data:", err);
  } else {
    try {
      users = JSON.parse(data);
      console.log("Users data loaded from users.json");
    } catch (parseError) {
      console.error("Error parsing users data:", parseError);
    }
  }
});
// Login endpoint
app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((user) => user.email === email);

  // If user not found or password doesn't match, return error
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });

  // Return token to client
  res.json({ success: true, token });
  if (user.verified) {
    user.loggedin = true;
    console.log(user.email, " is logged in");
  } else user.loggedin = false;
  console.log("needs to be verify: ", user.email);
  saveUsersToFile();
  currentUser = user;
  console.log(" users: ", users);
});

// Register endpoint
app.post("/api/users/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  if (users.find((user) => user.email === email)) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userId = Math.random().toString(36).substr(2, 9);

  const newUser = { id: userId, email, password: hashedPassword };
  newUser.verified = false;
  newUser.level = 0;

  const verificationLink = `http://localhost:${port}/api/users/verify/${userId}`; // You might want to adjust this to your actual domain

  await sendVerificationEmail(email, verificationLink);
  currentUser = newUser;
  users.push(newUser);

  saveUsersToFile();

  res.status(201).json({
    success: true,
    message:
      "Verification email sent. Please check your email to complete registration.",
  });
});
// Define a route handler for setting user.loggedin to false
app.post("/api/logout", (req, res) => {
  // Assuming you have access to the currentUser object
  currentUser.loggedin = false;
  saveUsersToFile();
  console.log("logged out");
  res.json({ message: "User logged out successfully." });
});

app.get("/api/current-user", (req, res) => {
  res.json(currentUser);
});

app.get("/api/users/verify/:userId", (req, res) => {
  const { userId } = req.params;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  user.verified = true; // Add a verified property to the user
  saveUsersToFile();

  res.send("Email verified successfully! You can now login.");
});

app.get("/api/users/verify-status/:email", (req, res) => {
  const { email } = req.params;
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  res.json({ verified: user.verified || false });
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
function updateUserLevel(level) {
  // Find the index of the user with the same email
  const existingUserIndex = users.findIndex(
    (user) => user.email === currentUser.email
  );

  // If a user with the same email is found, remove it
  if (existingUserIndex !== -1) {
    users.splice(existingUserIndex, 1);
  }
  currentUser.level = level;
  // Add the new user to the array
  users.push(currentUser);
  saveUsersToFile();
  console.log(currentUser);
}
function processEntryById(content, id) {
  console.log("Content received for processing:", content); // Debug: log the content

  const scoreRegex = /Score: (\d+)\/10/;
  const summaryRegex = /[^:]*:[^:]*: ([^\.]*)\./;

  const scoreMatch = content.match(scoreRegex);
  const summaryMatch = content.match(summaryRegex);

  if (scoreMatch && summaryMatch) {
    const score = parseInt(scoreMatch[1], 10);
    const summary = summaryMatch[1].trim();
    const scoreResult = score >= 6 ? 1 : 0;
    if (scoreResult === 1 && currentUser.level < 1) updateUserLevel(1);

    return { scoreResult, summary };
  } else {
    console.error("Pattern not found in content");
    return null;
  }
}

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
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
