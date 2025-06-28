const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/auth');
const list = require('./routes/list');

// Swagger dependencies
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Connect to DB only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  require('./conn/conn');
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Automatically generated Swagger docs for API testing',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update if using a different port
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust this if your routes are elsewhere
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.use('/api/v1', auth);
app.use('/api/v2', list);

// Export app (used by Keploy and server.js)
module.exports = app;
