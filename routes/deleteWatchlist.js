const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');
const keys = require('../config/keys');

// Import models
const WLStock = require('../models/WatchlistStock');

// Input validation
const validateInput = require('../validation/watchlist');

const router = express.Router();

router.post('/watchlist/delete', (req, res) => {
	const {error, isValid} = validateInput(req);

	if (!isValid)
		return res.status(400).json(errors);
});