import {
	GraphQLObjectType,
	GraphQLString
} from 'graphql'

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	fields: () => ({
		name: { type: GraphQLString }
	})
})

export default CategoryType