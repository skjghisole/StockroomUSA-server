import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLID
} from 'graphql'

const BrandType = new GraphQLObjectType({
	name: 'Brand',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString }
	})
})

export default BrandType