const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const router = express.Router();

//Input validation
const validateInput = require('../validation/login');

// User model
const User = require('../models/User');

// Login if user exists, else bad request
router.post('/loginUser', (req, res) =>
{
	const {error, isValid} = validateInput(req.body);

	// Checks if user entered ALL fields
	if (!isValid)
		return res.status(400).json(errors);

	// Looks for the user, if DNE then responds with bad response
	// If user does 
	User.findOne({email: req.body.email})
		.then(user => 
		{
			if (user.length == 0)
				return res.status(404).json({emailnotfound: "Email not found"});

			// Compareds passwords to confirm correct
			bcrypt.compare(req.body.password, user.password).then(isMatch =>
			{
				if (isMatch)
				{
					const payload = 
					{
						id: user.id
					};

					// Sign token
					jwt.sign(
						payload,
						keys.secretKey,
						{
							expiresIn: 31556926
						},
						(err, token) => 
						{
							res.json({
								success: true,
								token: "Bearer " + token
							});
						})
				}
				else
				{
					return res.status(400).json({passwordincorrect: "Password incorrect"});
				}
			})
		})
});

module.exports = router;