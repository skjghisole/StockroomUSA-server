import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLInputObjectType
} from 'graphql'

const SizeType = new GraphQLObjectType({
	name: 'Size',
	fields: () => ({
		size: { type: GraphQLString },
		quantity: { type: GraphQLInt }
	})
})


const InputSizeType = new GraphQLInputObjectType({
	name: 'InputSize',
	fields: () => ({
		size: { type: GraphQLString },
		quantity: { type: GraphQLInt }
	})
})

export {
	SizeType,
	InputSizeType
}