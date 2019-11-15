import {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInt
} from 'graphql'

import { Product } from '../../models'

import {
	ProductType,
	DocumentCountType
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
		args: {
			ids: { type: new GraphQLList(GraphQLID)}
		},
		async resolve(parent, query) {
			const { ids } = query
			if (ids) {
				return await Product.find({ _id: { $in: ids }})
			} else {
				return await Product.find({})
			}
		}
	},
	paginatedProducts: {
		type: new GraphQLList(ProductType),
		args: {
			skip: { type: GraphQLInt, default: 0 },
			limit: { type: GraphQLInt, default: 5 }
		},
		async resolve(parent, args) {
			return await Product.find().limit(args.limit).skip(args.skip)
		}
	},
	totalProductDocuments: {
		type: DocumentCountType,
		async resolve() {
			const count = await Product.find().estimatedDocumentCount()
			return { count }
		}
	}
}

export default ProductQueries