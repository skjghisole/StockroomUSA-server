import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID
} from 'graphql'


const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		name: GraphQLString,
		quantity: GraphQLInt,
		categoryId: GraphQLID,
		brandId: GraphQLID
	})
})

export default ProductType