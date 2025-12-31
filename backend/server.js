require('dotenv').config();

const express = require('express');
const http = require('http');

const configureMiddleware  = require('./middleware/middleware');

const routes = require('./routes');

// todo Start all consumers
// require('./consumers');

// todo Start all jobs
// require('./jobs');

// Retrieve the server's listening port from env  
const PORT = process.env.PORT || 8080;
 
// Initialize the Express application
const app = express(); 

// Add health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Configure middleware 
configureMiddleware(app) 

// Mount route handlers
// app.use(routes.auth, routes.onboarding, routes.space, routes.user, routes.billing);

// Create an HTTP server instance and attach the Express app to it
const server = http.createServer(app);

/**
 * Start the server and listen on the specified port.
 * The server listens on '0.0.0.0' to handle external network requests.
 */
server.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));