import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLID
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { Brand, Category } from '../../models'
import { BrandType, CategoryType } from './'


const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		name: { type: GraphQLString },
		quantity: { type: GraphQLInt },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
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
		id: { type: GraphQLID },
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