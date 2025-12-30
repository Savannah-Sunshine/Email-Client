const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World IT WORKSSS Yes!');
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));