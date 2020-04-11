const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');
const cors = require('cors');

const keys = require('../config/keys');

// Import models
const WLStock = require('../models/WatchlistStock');

// Input validation
const validateInput = require('../validation/watchlist');

const router = express.Router();

router.post('/watchlist/delete', cors(), (req, res) => {
	const {errors, isValid} = validateInput(req.body);
	const userID = String(decoder(req.body.token).id);

	if (!isValid)
		return res.status(400).json(errors);

	WLStock.findOneAndDelete({watcherID: userID, Ticker: req.body.ticker}, (err, watchlist) => {
		res.json("Stock removed from watchlist");
	});
});

module.exports = router;