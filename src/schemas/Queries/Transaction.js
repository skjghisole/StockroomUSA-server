import { GraphQLList, GraphQLID } from 'graphql'

import { TransactionType } from '../Types'

import { Transaction } from '../../models'

const TransactionQuery = {
	transactions: {
		type: new GraphQLList(TransactionType),
		description: 'Query of all transactions',
		async resolve() {
			return await Transaction.find({})
		}
	},
	transaction: {
		type: TransactionType,
		description: 'Query transaction by ID',
		args: {
			id: {
				type: GraphQLID
			}
		},
		async resolve(parent, { id }) {
			return await Transaction.findById(id)
		}
	},
}

export default TransactionQuery;