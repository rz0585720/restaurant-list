const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
	name: {
		type: 'string',
		required: true,
	},
	name_en: {
		type: 'string',
		required: true,
	},
	category: {
		type: 'string',
		required: true,
	},
	image: {
		type: 'string',
		required: true,
	},
	location: {
		type: 'string',
		required: true,
	},
	phone: {
		type: 'string',
		required: true,
	},
	google_map: {
		type: 'string',
		required: true,
	},
	rating: {
		type: 'number',
		required: true,
	},
	description: {
		type: 'string',
		required: true,
	},
	userId: {  
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
