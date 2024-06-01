document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
    fetch('127.0.0.1:3000/updateMe')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data) {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = ''; // Clear previous data

    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name; // Assuming each item has a 'name' property
        dataList.appendChild(listItem);
    });
}


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define your routes and middleware here
// For example:
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
