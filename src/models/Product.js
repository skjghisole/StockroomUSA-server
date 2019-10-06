import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const ProductSchema = new Schema({
	name: String,
	quantity: Number,
	categoryId: ObjectId,
	brandId: ObjectId
})

export default model('Product', ProductSchema)