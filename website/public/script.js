document.getElementById("hiddenInput").addEventListener("keypress", function (e) {
  if (e.key === 'Enter') {
    const userInput = e.target.value;
    const summaryDisplay = document.getElementById("summaryDisplay");

    if (userInput.length >= 15) {
      fetch("/processPrompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: userInput }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Expecting a JSON response now
      })
      .then(data => {
        // Use the data object directly to append summary and change color
        const summaryParagraph = document.createElement('p');
        summaryParagraph.textContent = data.summary;

        // Change paragraph color based on scoreResult
        if (data.scoreResult === 0) {
          summaryParagraph.style.color = '#A0153E'; // Negative feedback
        } else {
          summaryParagraph.style.color = '#65B741'; // Positive feedback
        }
        
        summaryParagraph.classList.add("text-reveal"); // Add fade-in animation class
        summaryDisplay.innerHTML = ""; // Clear previous content
        summaryDisplay.appendChild(summaryParagraph); // Append paragraph to summaryDisplay
        // Set timeout to trigger fade-out animation after 5 seconds
        setTimeout(() => {
          summaryParagraph.style.animation = "fadeOut 1s ease-in-out forwards";
        }, 6000); // Adjust timing as needed (5000 milliseconds = 5 seconds)
      })
      .catch(error => console.error("Error:", error));
    }
  }
});

