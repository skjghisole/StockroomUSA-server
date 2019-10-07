import {
	GraphQLObjectType,
	GraphQLString,
	GrpahQLID
} from 'graphql'

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	fields: () => ({
		id: { type: GrpahQLID },
		name: { type: GraphQLString }
	})
})

export default CategoryType