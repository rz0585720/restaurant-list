const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
	res.render('new')
})

router.get('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	return Restaurant.findOne({ _id, userId } )
		.lean()
		.then(restaurant => res.render('show', { restaurant }))
		.catch(error => console.log(error))
})

router.post('/', (req, res) => {
	const userId = req.user._id
	req.body = { ...req.body, userId }
	Restaurant.create(req.body)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	return Restaurant.findOne({ _id, userId })
		.lean()
		.then(restaurant => res.render('edit', { restaurant }))
		.catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	return Restaurant.findOne({ _id, userId })
		.then(restaurant => {
			restaurant = Object.assign(restaurant, req.body)
			return restaurant.save()
		})
		.then(() => res.redirect(`/restaurants/${_id}`))
		.catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	return Restaurant.findOne({ _id, userId })
		.then(restaurant => restaurant.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

module.exports = router
