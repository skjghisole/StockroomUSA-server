import {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from 'graphql'

import { Product } from '../../models'

import {
	ProductType
} from '../Types'

const ProductQueries = {
	product: {
		type: ProductType,
		description: 'For querying products with ID',
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
		},
		async resolve(parent, args) {
			return await Product.findById(args.id)
		}
	},
	products: {
		type: new GraphQLList(ProductType),
		description: 'For querying all products',
		async resolve() {
			return await Product.find({})
		}
	}
}

export default ProductQueries