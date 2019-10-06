import {
	GraphQLString,
	GraphQLObjectType
} from 'graphql'

const BrandType = new GraphQLObjectType({
	name: 'Brand',
	fields: () => ({
		name: { type: GraphQLString }
	})
})

export default BrandType