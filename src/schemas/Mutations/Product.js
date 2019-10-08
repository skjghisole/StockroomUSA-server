import {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from 'graphql'

import {
	Product
} from '../../models'

import {
	ProductType
} from '../Types'

// import {
// 	adminAuthenticated
// } from '../../utils'


const ProductMutation = {
	addProduct: {
		type: ProductType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) },
			quantity: { type: GraphQLInt },
			categoryIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
			brandIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) }
		},
		resolve(parent, args, ctx) {
			const { name, quantity, categoryIds, brandIds } = args
			const product = new Product({
				name,
				quantity,
				categoryIds,
				brandIds
			})
			// return adminAuthenticated(ctx, product.save.bind(product))
			return product.save()
		}
	}
}

export default ProductMutation