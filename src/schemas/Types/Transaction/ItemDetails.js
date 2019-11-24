import { GraphQLString, GraphQLInputObjectType, GraphQLObjectType, GraphQLID, GraphQLInt } from 'graphql';

const ItemDetailProperties = {
	fields: () => ({
		productId: {
			type: GraphQLID
		},
		quantity: {
			type: GraphQLInt
		},
		size: {
			type: GraphQLString
		},
		color: {
			type: GraphQLString
		}
	})
}

const ItemDetailsInputType = new GraphQLInputObjectType({
	name: 'ItemInput',
	...ItemDetailProperties
})

const ItemDetailsType = new GraphQLObjectType({
	name: 'Item',
	...ItemDetailProperties
})

export {
	ItemDetailsInputType,
	ItemDetailsType
}