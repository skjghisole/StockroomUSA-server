import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const ProductSchema = new Schema({
	name: String,
	quantity: Number,
	categoryIds: [ObjectId],
	brandIds: [ObjectId]
})

export default model('Product', ProductSchema)