import { GraphQLList } from 'graphql'

import { TransactionType, AddressInputType, CredentialInputType, ItemDetailsInputType } from '../Types';

import { Transaction, User } from '../../models'

const TransactionMutation = {
	addTransaction: {
		description: 'This mutation is for adding a new transaction',
		type: TransactionType,
		args: {
			shippingAddress: {
				type: AddressInputType
			},
			itemDetails: {
				type: new GraphQLList(ItemDetailsInputType)
			},
			recipient: {
				type: CredentialInputType
			},
		},
		async resolve(parent, args) {
			const { shippingAddress, itemDetails, recipient } = args;
			try {
				let user;
				const queriedUser = await User.findOne({ email: recipient.email })
				if (!queriedUser) {
					const newUser = new User({
						credentials: recipient,
						email: recipient.email,
						password: 'password',
						username: `${recipient.firstName.trim()} ${recipient.lastName.trim()}`
					});
					user = await newUser.save()
				} else {
					user = queriedUser
				}

				const transaction = new Transaction({
					shippingAddress,
					itemDetails,
					ownerId: user.id
				});

				const newTransaction = await transaction.save();
				await User.findByIdAndUpdate({ _id: user.id }, { transactionIds: [...user.transactionIds, newTransaction.id] })
				return newTransaction;
			} catch (err) {
				return err
			}
		}
	}
}

export default TransactionMutation;