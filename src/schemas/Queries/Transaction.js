import { GraphQLList } from 'graphql'

import { TransactionType } from '../Types'

import { Transaction } from '../../models'

const TransactionQuery = {
	transactions: {
		type: new GraphQLList(TransactionType),
		description: 'Query of all transactions',
		async resolve() {
			return await Transaction.find({})
		}
	}
}

export default TransactionQuery;