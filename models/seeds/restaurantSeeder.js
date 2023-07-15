const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER1 = {
	email: 'user1@example.com',
	password: '12345678',
	restaurantsOwned: [0, 1, 2],
}

const SEED_USER2 = {
	email: 'user2@example.com',
	password: '12345678',
	restaurantsOwned: [3, 4, 5],
}

db.once('open', () => {
	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(SEED_USER1.password, salt))
		.then(hash =>
			User.create({
				email: SEED_USER1.email,
				password: hash,
			})
		)
		.then(user => {
			const userId = user._id
			return Promise.all(
				Array.from({length: SEED_USER1.restaurantsOwned.length}, (_, i) =>
					Restaurant.create({
						...restaurantList[SEED_USER1.restaurantsOwned[i]],
						userId,
					})
				)
			)
		})
		.then(() => {
			console.log('user1 is done.')
		})

	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(SEED_USER2.password, salt))
		.then(hash =>
			User.create({
				email: SEED_USER2.email,
				password: hash,
			})
		)
		.then(user => {
			const userId = user._id
			return Promise.all(
				Array.from({length: SEED_USER2.restaurantsOwned.length}, (_, i) =>
					Restaurant.create({
						...restaurantList[SEED_USER2.restaurantsOwned[i]],
						userId,
					})
				)
			)
		})
		.then(() => {
			console.log('user2 is done.')
			process.exit()
		})
})
