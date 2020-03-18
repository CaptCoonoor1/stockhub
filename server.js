// Import packages needed
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Get and save required Keys
const avKey = require('./config/keys').alphaVantage;
const db = require('./config/keys').testMongoURI;

const av = require('alphavantage');
const accessAV = av({key: avKey});

// Routes
const register = require('./routes/registerUser');
const login = require('./routes/loginUser');
const stocks = require('./routes/stockOperations');

const app = express();

// Middleware set-up
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(express.Router());
app.use(passport.initialize());

require('./config/passport')(passport);

// Set headers, etc..
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next()
});

// Use routes
app.use('/', register);
app.use('/', login);
app.use('/', stocks);


// Currently responds to a POST with the symbol; returns intraday stock data
// app.post('/', (req, res) =>
// {
// 	accessAV.data.intraday(req.body.symbol, interval = 5)
// 		.then(data => res.json(data))
// 		.catch((err) => console.log(err));
// });


// Connect to database
mongoose
	.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port: ${ port }`));