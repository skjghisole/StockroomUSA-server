import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLInputObjectType
} from 'graphql'

const OutputSizeType = new GraphQLObjectType({
	name: 'OutputSizeType',
	fields: () => ({
		size: { type: GraphQLString },
		quantity: { type: GraphQLInt }
	})
})


const InputSizeType = new GraphQLInputObjectType({
	name: 'InputSizeType',
	fields: () => ({
		size: { type: GraphQLString },
		quantity: { type: GraphQLInt }
	})
})

export {
	OutputSizeType,
	InputSizeType
}