require("dotenv").config(); // at the top of your file
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = 3000;
const filePath = "data.json";
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
app.post("/checkOrder", (req, res) => {
  const { game, order } = req.body;

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
    } else {
      res.json({ feedback: "Incorrect. Please try again." });
    }
  } else if (game === "game1") {
    // Define the correct answer array for the second game
    const correctAnswer = [
      "Elysir",
      "Xerxes",
      "Pyrothia",
      "Aetheria",
      "Emberfell",
    ];

    // Split the user's input into an array of names
    const userAnswer = order.trim().split(" ");

    // Check if the user's answer contains all the correct names
    const correctNames = correctAnswer.filter((name) =>
      userAnswer.includes(name)
    );
    const incorrectNames = correctAnswer.filter(
      (name) => !userAnswer.includes(name)
    );

    // Send the appropriate feedback to the client
    if (correctNames.length === 5) {
      res.json({ feedback: "Correct!" });
    } else if (correctNames.length > 0) {
      res.json({
        feedback: `Partial correct. You only got ${
          correctNames.length
        } correct planets: ${correctNames.join(", ")}. Try again! 😉`,
      });
    } else {
      res.json({ feedback: "Incorrect. Please try again." });
    }
  } else if (game === "game4") {
    // Define the correct answer for the third game
    const correctAnswer = "4891";

    // Check if the user input matches the correct answer
    if (order === correctAnswer) {
      res.json({ feedback: "Correct! You've solved the puzzle." });
    } else {
      res.json({ feedback: "Incorrect." });
    }
  } else if (game === "game3") {
    // to do
  } else if (game === "game5") {
    const expectedString =
      "beautiful! in the realm of music, freedom knows no bounds!";
    const alternativeString =
      "thank you from the bottom of my heart. please continue to enjoy my rampaging music!!!";

    if (
      order === expectedString.toLowerCase() ||
      order === alternativeString.toLowerCase()
    ) {
      res.json({ feedback: "Well done" });
    } else {
      res.json({ feedback: "Wrong... Try again." });
    }
  } else {
    res.status(400).json({ error: "Invalid game identifier." });
  }
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// -------------------------------------------------------------------------

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

    return { scoreResult, summary };
  } else {
    console.error("Pattern not found in content");
    return null;
  }
}
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
