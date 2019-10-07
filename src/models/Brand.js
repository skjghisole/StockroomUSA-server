import mongoose from 'mongoose'

const { Schema, model } = mongoose

const BrandSchema = new Schema({
	name: String
}, { strict: true, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

export default model('Brand', BrandSchema)