document.getElementById('promptForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const userInput = document.getElementById('promptInput').value; // Get the user input
    
    // Send the user input to your Node.js server
    fetch('/processPrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: userInput }), // Send user input as JSON
    })
    .then(response => response.json())
    .then(data => {
        // Display the data. You might want to display it on your webpage
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
});

