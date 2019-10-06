import {
	GraphQLObjectSchema,
	GraphQLString,
	GraphQLInt,
	GraphQLID
} from 'graphql'


const ProductType = new GraphQLObjectSchema({
	name: 'Product',
	fields: () => ({
		name: GraphQLString,
		quantity: GraphQLInt,
		categoryId: GraphQLID,
		brandId: GraphQLID
	})
})

export default ProductType