import mongoose from 'mongoose'

const { Schema, model } = mongoose

const BrandSchema = new Schema({
	name: String
})

export default model('Brand', BrandSchema)