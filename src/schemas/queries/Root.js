import {
	GraphQLObjectType,
} from 'graphql'

import {
	BrandQueries,
	CategoryQueries,
	ProductQueries
} from './'

const fields = {
	...BrandQueries,
	...CategoryQueries,
	...ProductQueries
}

const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	fields
})

export default QueryType