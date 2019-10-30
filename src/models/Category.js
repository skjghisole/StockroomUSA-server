import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const CategorySchema = new Schema({
	name: String,
	image: {
		imageSrc: String,
		minifiedImageSrc: String,
		preloadImageSrc: String
	},
	createdAt: Date,
	updatedAt: Date,
	parentCategoryIds: {
		type: [ObjectId],
		default: []
	}
}, { strict: true, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

export default model('Category', CategorySchema)