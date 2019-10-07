import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})

export default CategoryType