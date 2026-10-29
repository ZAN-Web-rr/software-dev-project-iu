const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Configure Helmet with loose CSP for Bootstrap CDN
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(express.json());

// Serve static frontend dashboard files
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Health Check Probe Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'smart-task-microservice',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// API V1 Routes
app.use('/api/v1/tasks', taskRoutes);

// 404 Handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Requested API resource not found'
  });
});

module.exports = app;
