const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const port = 3000
const routes = require('./routes')

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
app.use(routes)
// routes settings




// start server
app.listen(port, () => {
	console.log(`Express is listening on port: ${port}`)
})
