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

import { OutputSizeType } from './'
import { Brand, Category } from '../../../models'
import { BrandType, CategoryType, ImageType } from '../'


const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		quantity: {
			type: GraphQLInt,
			resolve({ sizes, quantity }) {
				if (sizes.length > 0) {
					return sizes.reduce((acc, curr) => {
						return acc + curr.quantity
					}, 0)
				} else {
					return quantity
				}
			}
		},
		price: { type: GraphQLInt },
		images: { type: new GraphQLList(ImageType) },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		sizes: {
			type: new GraphQLList(OutputSizeType)
		},
		brands: {
			type: new GraphQLList(BrandType),
			async resolve(parent) {
				return await Brand.find({
					_id: {
						$in: parent.brandIds
					}
				})
			}
		},
		categories: {
			type: new GraphQLList(CategoryType),
			resolve(parent) {
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