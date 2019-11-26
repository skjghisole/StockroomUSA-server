import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const ItemSchema = new Schema({
	productId: {
		type: ObjectId
	},
	quantity: {
		type: Number
	},
	size: {
		type: String
	},
	color: {
		type: String
	}
})

const TransactionSchema = new Schema({
	recipient: {
		firstName: {
			type: String,
			default: ''
		},
		lastName: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			default: ''
		},
		phone: {
			type: String,
			default: ''
		}
	},
	itemDetails: [ItemSchema],
	shippingAddress: {
		mainAddress: {
			type: String,
			default: ''
		},
		secondaryAddress: {
			type: String,
			default: ''
		},
		street: {
			type: String,
			default: ''
		},
		city: {
			type: String,
			default: ''
		},
		country: {
			type: String,
			default: 'Philippines'
		},
		zipCode: {
			type: Number,
			default: 5000
		},
		countryCode: {
			type: String,
			default: 'PH'
		},
		state: {
			type: String,
			default: ''
		}
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

export default model('Transaction', TransactionSchema)