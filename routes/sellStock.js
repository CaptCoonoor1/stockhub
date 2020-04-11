const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');
const cors = require('cors');

const keys = require('../config/keys');

// Import models
const Stock = require('../models/PortfolioStock');
const User = require('../models/User');

// External API for stock data
const av = require('alphavantage');
const accessAV = av({key: keys.alphaVantage});

const router = express.Router()

// Input validation
const validateInput = require('../validation/stock');

router.post('/stock/sell_market', cors(), async (req, res) => {
	const {errors, isValid} = validateInput(req.body);

	if (!isValid)
		return res.status(400).json(errors);

	var data = await accessAV.data.quote(symbol=String(req.body.ticker))
							.then(data => {return data})
							.catch((err) => console.log(err));

	
	var sharePrice = parseFloat(data['Global Quote']['05. price']);
	var sellQuantity = parseFloat(req.body.quantity);
	var sellValue = sharePrice * sellQuantity;
	const userID = String(decoder(req.body.token).id);

	Stock.findOne({buyerID: userID, Ticker: String(req.body.ticker)}, (err, stock) => {
		if (stock == null)
		{
			res.status(400).json({stockOwned: false});
		}
		else
		{
			if (sellQuantity > stock.Quantity)
			{
				res.json({notEnoughShares: true});
			}
			else
			{
				stock.Quantity = stock.Quantity - sellQuantity;
				stock.save();

				User.findById(userID)
					.then(user => {
						user.cash = user.cash + sellValue;
						user.save();
					});

				if (stock.Quantity == 0)
				{
					Stock.findByIdAndDelete(stock.id, (err, del_stock) => {
						console.log('Delete Document: Quantity < 0');
					});
				}

				res.json({sold: true});
			}
		}

	});
});

// Limit sell

module.exports = router;