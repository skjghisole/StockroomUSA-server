import mongoose from 'mongoose'

const { Schema, model } = mongoose

const BrandSchema = new Schema({
	name: String,
	image: {
		imageSrc: String,
		minifiedImageSrc: String,
		preloadImageSrc: String
	},
	createdAt: Date,
	updatedAt: Date
}, { strict: true, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

export default model('Brand', BrandSchema)