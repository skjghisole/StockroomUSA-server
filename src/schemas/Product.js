import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID
} from 'graphql'


const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		name: { type: GraphQLString },
		quantity: { type: GraphQLInt },
		categoryId: { type: GraphQLID },
		brandId: { type: GraphQLID }
	})
})

export default ProductType