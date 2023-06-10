const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
	console.log('Creating seeder!')

	Restaurant.create(restaurantList)
		.then(() => {
			console.log('done!')
		})
		.catch(error => console.log(error))
	console.log('done!')
})
