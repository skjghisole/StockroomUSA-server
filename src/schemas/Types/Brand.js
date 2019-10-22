import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLID,
	GraphQLList
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { Product } from '../../models'

import { CategoryType, ProductType, ImageType } from './' 

const BrandType = new GraphQLObjectType({
	name: 'Brand',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		image: {
			type: ImageType,
			resolve({ imageSrc, preloadImageSrc }) {
				return {
					imageSrc,
					preloadImageSrc
				}
			}
		},
		categories: { type: new GraphQLList(CategoryType) },
		products: {
			type: new GraphQLList(ProductType),
			async resolve({id}) {
				return await Product.find({ brandIds: { $in: [id]  } })
			}
		}
	})
})

export default BrandType