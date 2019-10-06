import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID
} from 'graphql'

import {
	Brand,
	Category,
	Product
} from '../models'

import {
	BrandType,
	CategoryType,
	ProductType
} from './Types'

const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addBrand: {
			type: BrandType,
			args: {
				name: { type: GraphQLString }
			},
			resolve(parent, args) {
				const { name } = args
				const brand = new Brand({
					name
				})
				return brand.save()
			}
		},
		addCategory: {
			type: CategoryType,
			args: {
				name: { type: GraphQLString }
			},
			resolve(parent, args) {
				const { name } = args
				const category = new Category({
					name
				})
				return category.save()
			}
		},
		addProduct: {
			type: ProductType,
			args: {
				name: { type: GraphQLString },
				quantity: { type: GraphQLInt },
				categoryId: { type: GraphQLID },
				brandId: { type: GraphQLID }
			},
			resolve(parent, args) {
				const { name, quantity, categoryId, brandId } = args
				const product = new Product({
					name,
					quantity,
					categoryId,
					brandId
				})
				return product.save()
			}
		}
	}
})

export default MutationType