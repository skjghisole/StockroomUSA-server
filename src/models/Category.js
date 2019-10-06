import mongoose from 'mongoose'

const { Schema, model } = mongoose

const CategorySchema = new Schema({
	name: String
})

export default model('Category', CategorySchema)