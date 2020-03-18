const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');
const keys = require('../config/keys');

// Import models
const Stock = require('../models/PortfolioStock');
const User = require('../models/User');

// External API for stock data
const av = require('alphavantage');
const accessAV = av({key: keys.alphaVantage});


const router = express.Router();

// Input validation
const validateInput = require('../validation/stock');

// ticker and quantity required; ASSUMES MARKET ORDER
router.post('/stock/buy', (req, res) => {
	const {errors, isValid} = validateInput(req.body);

	if (!isValid)
		return res.status(400).json(errors);

	//Currently responds to a POST with the symbol; returns intraday stock data
	accessAV.data.quote(symbol=String(req.body.ticker))
						.then(data => {
							userID = String(decoder(req.body.token).id);

							// Looks for user: check if has enough capital
							User.findById(userID)
								.then(user => {
									cash = parseFloat(user.cash);
									sharePrice = parseFloat(data['Global Quote']['05. price']);
									quantity = parseFloat(req.body.quantity);

									// If the user has enough cash:
									// 1. add stock to the portfolio
									// 2. subtract and update the cash
									// ** How should this data be encrypted? -> need to be able to hash/unhash **
									if (cash >= (sharePrice * quantity))
									{
										cash = cash - (sharePrice * quantity);
										user.cash = cash;

										// Checks if the user already owns shares:
										// if yes -> calculates new average price and new amount of shares
										// if no -> establishes the shares in their portfolio
										Stock.findOne({buyerID: userID, Ticker: String(req.body.ticker)}, (err, stock) => {
											if (stock == null)
											{
												const buyStock = new Stock({
													Company: data['Global Quote']['01. symbol'],
													Ticker: data['Global Quote']['01. symbol'],
													AvgPrice: sharePrice,
													Quantity: quantity,
													buyerID: userID
												});

												console.log("No previous shares owned");
												buyStock.save();
											}
											else
											{
												var newAvgPrice = (stock.Quantity * stock.AvgPrice) + (sharePrice * quantity);
												newAvgPrice = newAvgPrice / (stock.Quantity + quantity);

												stock.AvgPrice = newAvgPrice;
												stock.Quantity = stock.Quantity + quantity;

												console.log("Previous shares already owned");
												stock.save();
											}
										})
											.then()
											.catch((err) => console.log(err));

										user.save();
										res.json("Buying");
									}
									else
									{
										res.json("Not enough capital");
									}


								})
								.catch((err) => console.log(err));
						})
						.catch((err) => console.log(err));

});

module.exports = router;