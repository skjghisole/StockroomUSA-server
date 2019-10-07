import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql'

import { Brand, Category } from '../models'
import { BrandType, CategoryType } from './Types'


const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		name: { type: GraphQLString },
		quantity: { type: GraphQLInt },
		brands: {
			type: new GraphQLList(BrandType),
			resolve(parent, args) {
				return Brand.find({
					_id: {
						$in: parent.brandIds
					}
				})
			}
		},
		categories: {
			type: new GraphQLList(CategoryType),
			resolve(parent, args) {
				return Category.find({
					_id: {
						$in: parent.categoryIds
					}
				})
			}
		}
		
	})
})

export default ProductType