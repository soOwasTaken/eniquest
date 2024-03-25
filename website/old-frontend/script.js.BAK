document.getElementById("promptForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const userInput = document.getElementById("promptInput").value; // Get the user input
  const submitButton = document.getElementById("submitButton"); // Get the submit button
  // Check if the user input is at least 15 characters long
  if (userInput.length < 15) {
    // Display an error message and disable the submit button
    alert("Please enter at least 15 characters.");
    submitButton.disabled = true;
  } else {
    // Enable the submit button and send the user input to your Node.js server
    fetch("/processPrompt", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: userInput }), // Send user input as JSON
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Get the response text
    })
    .then(text => {
      // Extract text between the third pair of quotation marks using a regular expression
      const extractedText = text.match(/(?:[^"]*"){3}([^"]*)"/)[1];

      // Display the extracted text in the summary paragraph
      const summaryParagraph = document.createElement('p');
      summaryParagraph.textContent = extractedText;
      summaryDisplay.appendChild(summaryParagraph);
    })

    .catch((error) => console.error("Error:", error));
  }
});
