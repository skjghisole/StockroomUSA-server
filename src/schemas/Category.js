import {
	GraphQLObjectSchema,
	GraphQLString
} from 'graphql'

const CategoryType = new GraphQLObjectSchema({
	name: 'Category',
	fields: () => ({
		name: { type: GraphQLString }
	})
})

export default CategoryType