const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');
const cors = require('cors');

const keys = require('../config/keys');

// Import models
const WLStock = require('../models/WatchlistStock');

const router = express.Router();

router.post('/watchlist/get', cors(), (req, res) => {
	const userID = String(decoder(req.body.token).id);

	WLStock.find({watcherID: userID})
		.then(WLStock => res.status(200).json(WLStock))
		.catch((err) => console.log(err));
});

module.exports = router;