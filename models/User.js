const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	cash: {
		type: Number,
		required: true
	}
},
{
	collection: 'users',
	versionKey: false
});

module.exports = user = mongoose.model('user', userSchema);