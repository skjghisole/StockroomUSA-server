import {
	GraphQLObjectType,
} from 'graphql'

import {
	BrandQueries,
	CategoryQueries,
	ProductQueries,
	UserQueries,
	TransactionQueries
} from './'

const fields = {
	...BrandQueries,
	...CategoryQueries,
	...ProductQueries,
	...UserQueries,
	...TransactionQueries
}

const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	fields,
})

export default QueryType