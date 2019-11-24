import { GraphQLList } from 'graphql'

import { TransactionType, AddressInputType, CredentialInputType, ItemDetailsInputType } from '../Types';

import { Transaction } from '../../models'

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
				const transaction = new Transaction({
					shippingAddress,
					itemDetails,
					recipient
				});
				const newTransaction = await transaction.save();
				return newTransaction;
			} catch (err) {
				return err
			}
		}
	}
}

export default TransactionMutation;