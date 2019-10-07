import mongoose from 'mongoose'

const { Schema, model } = mongoose

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	},
	createdAt: Date,
	updatedAt: Date
}, {
	strict: true,
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
})

export default model('User', UserSchema)