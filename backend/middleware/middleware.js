const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mobileBlockerMiddleware = require('./mobileBlocker');

const configureMiddleware = (app) => { 
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? [ process.env.FRONTEND_URL ]
      : ['http://localhost:3000'];

    app.use(cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
    }));

    // Protect API endpoints (server-side) from mobile access
    app.use(mobileBlockerMiddleware);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
};

module.exports = configureMiddleware;