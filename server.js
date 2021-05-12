const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config({ path: 'variables.env' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use(async (req, res, next) => {
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${
      req.originalUrl
    }`,
  );
  next();
});

app.use(cors());

app.use('/', routes);

// done! we export it so we can start the site in start.js
app.set('port', process.env.PORT || 4000);
app.set('host', process.env.HOST || '0.0.0.0');

const server = app.listen(app.get('port'), app.get('host'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
