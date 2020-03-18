const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
	Company: {
		type: String,
		required: false
	},
	Ticker: {
		type: String,
		required: true
	},
	AvgPrice: {
		type: Number,
		required: true
	},
	Quantity: {
		type: Number,
		required: true
	},
	buyerID: {
		type: String,
		required: true
	}
},
{
	collection: 'portfolio',
	versionKey: false
});

module.exports = stock = mongoose.model('stock', stockSchema);