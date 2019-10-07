import {
	GraphQLID,
	GraphQLList,
	GraphQLString,
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
		resolve(parent, args) {
			return Product.findById(args.id)
		}
	},
	products: {
		type: new GraphQLList(ProductType),
		description: 'For querying all products',
		args: {
			name: { type: GraphQLString }
		},
		resolve(parent, args) {
			console.log(args)
			return Product.find({})
		}
	}
}

export default ProductQueries