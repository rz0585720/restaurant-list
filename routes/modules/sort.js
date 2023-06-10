const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:sort', (req, res) => {
	const sort = req.params.sort
	const sortOptions = {
		nameAsc: { name_en: 'asc' },
		nameDesc: { name_en: 'desc' },
		category: { category: 'asc' },
		location: { location: 'asc' },
    ratingDesc: { rating: 'desc' },
    ratingAsc: { rating: 'asc' }
	}
	Restaurant.find()
		.sort(sortOptions[sort])
		.lean()
		.then(restaurants => res.render('index', { restaurants }))
		.catch(error => console.log(error))
})

module.exports = router
