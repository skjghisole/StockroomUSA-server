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
import { BrandType, CategoryType, ImageType } from './'


const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		quantity: { type: GraphQLInt },
		images: {
			type: new GraphQLList(ImageType),
			resolve({ imageSrc, preloadImageSrc }) {
				let images = imageSrc.reduce((acc, curr, index) => {
					return acc.concat({
						imageSrc: curr,
						preloadImageSrc: preloadImageSrc[index]
					})
				}, [])
				return images
			}
		},
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
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