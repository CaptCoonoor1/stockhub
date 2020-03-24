const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');
const keys = require('../config/keys');

// Import models
const Stock = require('../models/PortfolioStock');
const User = require('../models/User');

const router = express.Router();

router.post('/getPortfolio', (req, res) => {
	const userID = String(decoder(req.body.token).id);

	Stock.find({buyerID: userID})
		.then(stock => res.status(200).json(stock))
		.catch((err) => console.log(err));
});

module.exports = router;