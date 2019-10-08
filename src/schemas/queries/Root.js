import {
	GraphQLObjectType,
} from 'graphql'

import {
	BrandQueries,
	// CategoryQueries,
	// ProductQueries,
	// UserQueries
} from './'

const fields = {
	...BrandQueries,
	// ...CategoryQueries,
	// ...ProductQueries,
	// ...UserQueries
}

const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	fields
})

export default QueryType