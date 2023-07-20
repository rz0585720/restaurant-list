const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { users, restaurants } = require('../../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const db = require('../../config/mongoose')

db.once('open', async () => {
	try {
		await Promise.all(
			users.map(async (user, user_index) => {
				const salt = await bcrypt.genSalt(10)
				const hash = await bcrypt.hash(user.password, salt)
				const createdUser = await UserModel.create({
					name: user.name,
					email: user.email,
					password: hash,
				})
				console.log('user created')

				const userRestaurant = []
				restaurants.forEach((restaurant, rest_index) => {
					if (rest_index >= 3 * user_index && rest_index < 3 * (user_index + 1)) {
						restaurant.userId = createdUser._id
						userRestaurant.push(restaurant)
					}
				})
				await RestaurantModel.create(userRestaurant)
				console.log('restaurant created')
			})
		)
		console.log('All users and restaurants are created!')
		process.exit()
	}
	catch (err) {
		console.log(err)
	}
})