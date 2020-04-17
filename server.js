// Import packages needed
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const swagger = require('swagger-ui-express');
const swagJson = require('./config/swagger.json');
const path = require('path');

// Get and save required Keys
const avKey = require('./config/keys').alphaVantage;
const db = require('./config/keys').testMongoURI;

const av = require('alphavantage');
const accessAV = av({ key: avKey });

// Routes
const register = require('./routes/registerUser');
const login = require('./routes/loginUser');
const buyStock = require('./routes/buyStock');
const sellStock = require('./routes/sellStock');
const getPortfolio = require('./routes/getPortfolio');
const addWatchlist = require('./routes/addWatchlist');
const deleteWatchlist = require('./routes/deleteWatchlist');
const quote = require('./routes/getQuote');

const app = express();

// Middleware set-up
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(express.Router());
app.use(passport.initialize());

require('./config/passport')(passport);
require('dotenv').config();

// Set headers, etc..
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	);
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

// Use routes
app.use('/', register);
app.use('/', login);
app.use('/', buyStock);
app.use('/', sellStock);
app.use('/', getPortfolio);
app.use('/', addWatchlist);
app.use('/', deleteWatchlist);
app.use('/', quote);

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.use('/swagger', swagger.serve, swagger.setup(swagJson));

app.use(cors());

// Connect to database
mongoose
	.connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.log(err));

const port = process.env.PORT || 5000;

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "index.html"));
// });

app.use(serveStatic(__dirname + "frontend/dist"));

app.listen(port, () => console.log(`listening on port: ${port}`));