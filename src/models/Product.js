import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const ProductSchema = new Schema({
	name: String,
	quantity: {
		type: Number,
		default: 0
	},
	categoryIds: {
		type: [ObjectId]
	},
	brandIds: [ObjectId],
	createdAt: Date,
	updatedAt: Date
}, { strict: true, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

export default model('Product', ProductSchema)