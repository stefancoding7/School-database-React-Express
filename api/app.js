'use strict';

// load modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const courseR = require('./routes/course');
const userR = require('./routes/user');
const sequelize = require('./models').sequelize;


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';



// create the Express app
const app = express();

//enable use CORS
app.use(cors());

// Setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// // setup a friendly greeting for the root route
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Welcome to the REST API project!',
//   });
// });

app.use('/api', courseR);
app.use('/api', userR);


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});


// test DB connection
(async () => {
      try {
          await sequelize.authenticate();
          console.log('Connection to the database successful!');
  
      } catch (error) {
          console.error('Error connecting to the database: ', error);
  
      }
    
  })();

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
