const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const results = restaurantList.results

const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes settings
app.get('/', (req, res) => {
	res.render('index', { restaurants: results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
	const restaurant = results.find(
		restaurant => restaurant.id.toString() === req.params.restaurant_id
	)
	res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
	if (!req.query.keyword) {
		return res.redirect('/')
	}

	const keyword = req.query.keyword.trim().toLowerCase()
	const restaurants = results.filter(restaurant => {
		return (
			restaurant.name.toLowerCase().includes(keyword) ||
			restaurant.category.toLowerCase().includes(keyword)
		)
	})
	res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start server
app.listen(port, () => {
	console.log(`Express is listening on port: ${port}`)
})
