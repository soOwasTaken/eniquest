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
        summaryParagraph.classList.add("text-reveal");
        summaryParagraph.textContent = data.summary;

        // Change paragraph color based on scoreResult
        if (data.scoreResult === 0) {
          summaryParagraph.style.color = 'red'; // Negative feedback
        } else {
          summaryParagraph.style.color = 'green'; // Positive feedback
        }
        summaryDisplay.innerHTML="";
        summaryDisplay.appendChild(summaryParagraph);
      })
      .catch(error => console.error("Error:", error));
    }
  }
});

