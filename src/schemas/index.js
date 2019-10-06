import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLString,
	GraphQLList
} from 'graphql'

import { Product } from '../models'

let db = {
	products: []
}

// const ProductType = new GraphQLObjectType({
// 	name: 'Product',
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		quantity: { type: GraphQLInt }
// 	})
// })

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		product: {
			type: ProductType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				// return db.products.find(x => x.id == args.id)
				return Product.findById(args.id)
			}
		},
		products: {
			type: new GraphQLList(ProductType),
			resolve() {
				// return db.products
				return Product.find({})
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addProduct: {
			type: ProductType,
			args: {
				name: { type: GraphQLString },
				quantity: { type: GraphQLInt }
			},
			resolve(parent, { name, quantity, categoryId, brandId }) {
				let product = new Product({
					name,
					quantity,
					categoryId,
					brandId
				})
				return product.save()
				// let product = { name, quantity, id: db.products.length }
				// db.products.push(product)
				// return product
			}
		},
		removeProduct: {
			type: ProductType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, { id }) {
				const index = db.products.findIndex(product => product.id == id)
				const product = db.products.splice(index, 1)
				return product[0]
			}
		}
	}
})

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})