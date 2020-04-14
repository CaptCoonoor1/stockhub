const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const cors = require('cors');

const User = require('../models/User');

const router = express.Router();

//Input validation
const validateInput = require('../validation/register');

router.post('/register', cors(), (req, res) => {
	const { errors, isValid } = validateInput(req.body);

	// Checks user entered fields
	// If not complete returns
	if (!isValid) res.status(400).json(errors);

	// Tries to find a user the email
	// If user DNE then create him
	User.find({ email: req.body.email })
		.then((user) => {
			// User Check/Create
			if (user.length > 0) {
				res.status(400).json({ user: 'User already exists' });
			} else {
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					cash: 10000,
				});

				// Generate and hash the saved password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;

						newUser.password = hash;

						newUser
							.save()
							.then((user) => res.json(user))
							.catch((err) => console.log(err));
					});
				});
			}
		})
		.catch((err) => console.log(err));
});

module.exports = router;
