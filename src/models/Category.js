import mongoose from 'mongoose'

const { Schema, model } = mongoose

const CategorySchema = new Schema({
	name: String,
	createdAt: Date,
	updatedAt: Date
}, { strict: true, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

export default model('Category', CategorySchema)