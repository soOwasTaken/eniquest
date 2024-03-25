const promptInput = document.getElementById('promptInput');
const submitButton = document.getElementById('submitButton');
const form = document.getElementById('promptForm');
const summaryDisplay = document.getElementById('summaryDisplay');



// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const userInput = promptInput.value; // Get the user input
    fetch('/processPrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        // Display the response text in the summary paragraph
        const summaryParagraph = document.createElement('p');
        summaryParagraph.textContent = text;
        summaryDisplay.appendChild(summaryParagraph);
    })
    .catch(error => {
        console.error('Error:', error);
        summaryDisplay.textContent = 'Error retrieving summary.'; // Display error message for fetch error
    });
});

