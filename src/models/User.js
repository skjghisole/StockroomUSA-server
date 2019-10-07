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
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
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