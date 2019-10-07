import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
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
				name: { type: new GraphQLNonNull(GraphQLString) },
				quantity: { type: GraphQLInt },
				categoryIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
				brandIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) }
			},
			resolve(parent, args) {
				const { name, quantity, categoryIds, brandIds } = args
				const product = new Product({
					name,
					quantity,
					categoryIds,
					brandIds
				})
				return product.save()
			}
		}
	}
})

export default MutationType