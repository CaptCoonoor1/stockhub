const express = require('express');
const Validator = require("validator");
const isEmpty = require("is-empty");
const cors = require('cors');
const av = require('alphavantage');

const keys = require('../config/keys');
const accessAV = av({key: keys.alphaVantage});

const router = express.Router();

// POST request
// Requires: ticker
// Returns: stock data
router.post('/quote', cors(), async (req, res) => {
	ticker = !isEmpty(req.body.ticker) ? req.body.ticker : "";

	console.log("Searching for: " + ticker);

	if (ticker == "")
	{
		res.status(400).json("Invalid ticker: please resend");
		return;
	}

	var data = await accessAV.data.quote(symbol=String(ticker))
							.then(data => {return data})
							.catch((err) => console.log(err));

	res.status(200).json(data);
});

module.exports = router;
