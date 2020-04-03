const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
	Company: {
		type: String,
		required: false
	},
	Ticker: {
		type: String,
		required: true
	},
	Price: {
		type: Number,
		required: true
	},
	watcherID: {
		type: String,
		required: true
	}
},
{
	collection: 'watchlist',
	versionKey: false
});

module.exports = watchlist = mongoose.model('watchlist', watchlistSchema);