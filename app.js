const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
	console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
	console.log('mongodb connected!')
})

// express template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// routes settings
app.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.then(restaurants => res.render('index', { restaurants }))
		.catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
	res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
	const id = req.params.id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('show', { restaurant }))
		.catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

app.post('/restaurants', (req, res) => {
	Restaurant.create(req.body)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
	const id = req.params.id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('edit', { restaurant }))
		.catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
	const id = req.params.id
	return Restaurant.findByIdAndUpdate(id, req.body)
		.then(() => res.redirect(`/restaurants/${id}`))
		.catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
	const id = req.params.id
	return Restaurant.findByIdAndRemove(id)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

// start server
app.listen(port, () => {
	console.log(`Express is listening on port: ${port}`)
})
