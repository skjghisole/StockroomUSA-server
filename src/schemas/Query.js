import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLList,
	GraphQLString,
	GraphQLNotNull
} from 'graphql'

import { Brand, Category, Product } from '../models'

import {
	BrandType,
	CategoryType,
	ProductType
} from './Types'


const QueryType = new GraphQLObjectType({
	name: 'QueryType',
	fields: {
		brand: {
			type: BrandType,
			args: {
				id: { type: new GraphQLNotNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Brand.findById(args.id)
			}
		},
		brands: {
			type: new GraphQLList(BrandType),
			resolve() {
				return Brand.find({})
			}
		},
		category: {
			type: CategoryType,
			args: {
				id: { type: new GraphQLNotNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Category.findById(args.id)
			}
		},
		categories: {
			type: new GraphQLList(CategoryType),
			resolve() {
				return Category.find({})
			}
		},
		product: {
			type: ProductType,
			args: {
				id: { type: new GraphQLNotNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Product.findById(args.id)
			}
		},
		products: {
			type: new GraphQLList(ProductType),
			args: {
				name: { type: GraphQLString }
			},
			resolve(parent, args) {
				console.log(args)
				return Product.find({})
			}
		}
	}
})

export default QueryType