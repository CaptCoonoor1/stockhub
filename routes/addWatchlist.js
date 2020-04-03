const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');
const keys = require('../config/keys');

// Import models
const WLStock = require('../models/WatchlistStock');

// Input validation
const validateInput = require('../validation/watchlist');

// External API for stock data
const av = require('alphavantage');
const accessAV = av({key: keys.alphaVantage});

const router = express.Router();

router.post('/watchlist/add', async (req, res) => {
	const {errors, isValid} = validateInput(req);
	const userID = String(decoder(req.body.token).id);

	if (!isValid)
		return res.status(400).json(errors);

	var data = await accessAV.data.quote(symbol=String(req.body.ticker))
							.then(data => {return data})
							.catch((err) => console.log(err));

	WLStock.findOne({watcherID: userID, Ticker: req.body.ticker}, (err, watchlist) => {
		if (watchlist == null)
		{
			const wl = new WLStock({
				Ticker: req.body.ticker,
				watcherID: userID,
				Price: parseFloat(data['Global Quote']['05. price'])
			});

			wl.save();
			res.json("Stock added to watchlist");
		}
		else
		{
			res.json("Stock in watchlist");
		}
	});
});


module.exports = router;