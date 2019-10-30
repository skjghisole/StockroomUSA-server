import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const ProductSchema = new Schema({
	name: String,
	description: String,
	quantity: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		default: 0
	},
	sizes: {
		type: [Object],
		default: []
	},
	categoryIds: {
		type: [ObjectId]
	},
	brandIds: [ObjectId],
	images: [{
		imageSrc: String,
		minifiedImageSrc: String,
		preloadImageSrc: String
	}],
	createdAt: Date,
	updatedAt: Date
}, { strict: true, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

export default model('Product', ProductSchema)