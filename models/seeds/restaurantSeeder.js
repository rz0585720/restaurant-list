const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection
// 連線異常
db.on('error', () => {
	console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
	console.log('Creating seeder!')

	Restaurant.create(restaurantList)
		.then(() => {
			console.log('done!')
		})
		.catch(error => console.log(error))
})
