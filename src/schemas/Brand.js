import {
	GraphQLString,
	GraphQLObjectSchema
} from 'graphql'

const BrandType = new GraphQLObjectSchema({
	name: 'Brand',
	fields: () => ({
		name: { type: GraphQLString }
	})
})

export default BrandType