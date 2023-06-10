const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
	res.render('new')
})

router.get('/:id', (req, res) => {
	const id = req.params.id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('show', { restaurant }))
		.catch(error => console.log(error))
})

router.post('/', (req, res) => {
	Restaurant.create(req.body)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
	const id = req.params.id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('edit', { restaurant }))
		.catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
	const id = req.params.id
	return Restaurant.findByIdAndUpdate(id, req.body)
		.then(() => res.redirect(`/restaurants/${id}`))
		.catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
	const id = req.params.id
	return Restaurant.findByIdAndRemove(id)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

module.exports = router