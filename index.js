// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/users');

// Initialize app
const app = express();

// Mount middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Mount routes
app.use('/users', userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err); // pass the error to the next piece of middleware
});

/* 
  error handler - for a handler with four parameters, 
  the first is assumed to be an error passed by another
  handler's "next"
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server starting on port 3000...');
});
