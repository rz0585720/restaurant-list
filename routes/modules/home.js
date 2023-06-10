const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.then(restaurants => res.render('index', { restaurants }))
		.catch(error => console.log(error))
})

router.get('/search', (req, res) => {
	if (!req.query.keyword) {
		return res.redirect('/')
	}

	const keyword = req.query.keyword.trim().toLowerCase()
	Restaurant.find({})
		.lean()
		.then(restaurants => {
			const searchResults = restaurants.filter(data => {
				return (
					data.name.toLowerCase().includes(keyword) ||
					data.category.toLowerCase().includes(keyword)
				)
			})
			console.log(searchResults)
			res.render('index', { restaurants: searchResults, keyword })
		})
		.catch(error => console.log(error))
})

module.exports = router