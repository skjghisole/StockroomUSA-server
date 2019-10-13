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
			const { user, authError } = ctx
			const product = new Product({
				name,
				quantity,
				categoryIds,
				brandIds
			})
			
			if (user.role === "ADMIN" && !authError) {
				return product.save()
			} else if (authError) {
				throw new Error(authError)
			} else {
				throw new Error('NOT AUTHORIZED!')
			}
		}
	}
}

export default ProductMutation