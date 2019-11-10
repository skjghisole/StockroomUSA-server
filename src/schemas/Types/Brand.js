import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLID,
	GraphQLList
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { Product, Category } from '../../models'

import { ProductType, ImageType } from './' 

const BrandType = new GraphQLObjectType({
	name: 'Brand',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		image: { type: ImageType },
		products: {
			type: new GraphQLList(ProductType),
			async resolve({id}) {
				return await Product.find({ brandIds: { $in: [id]  } })
			}
		},
		categories: {
			type: new GraphQLList(BrandType),
			async resolve({ id }) {
				const products = await Product.find({ brandIds: { $in: [id] } })
				const categoryIds = products.reduce((acc, curr) => {
					return acc.concat(curr.categoryIds.filter(categoryId => !acc.includes(categoryId.toString())).map(id => id.toString()))
				}, [])
				return await Promise.all(categoryIds.map(id => Category.findById(id)))
			}
		}
	})
})

export default BrandType