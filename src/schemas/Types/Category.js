import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { Product, Brand } from '../../models'

import {
	ImageType,
	ProductType,
	BrandType
} from './'

import { Category } from '../../models'

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		image: { type: ImageType },
		parentCategoryIds: {
			type: new GraphQLList(GraphQLID)
		},
		subCategories: {
			type: new GraphQLList(CategoryType),
			async resolve({ id }) {
				return await Category.find({ parentCategoryIds: { $in: [id] } })
			}
		},
		products: {
			type: new GraphQLList(ProductType),
			async resolve({ id }) {
				return await Product.find({ categoryIds: { $in: [id]  } })
			}
		},
		brands: {
			type: new GraphQLList(BrandType),
			async resolve({ id }) {
				const products = await Product.find({ categoryIds: { $in: [id] } })
				const brandIds = products.reduce((acc, curr) => {
					return acc.concat(curr.brandIds.filter(brandId => !acc.includes(brandId.toString())).map(id => id.toString()))
				}, [])
				return await Promise.all(brandIds.map(id => Brand.findById(id)))
			}
		},
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})

export default CategoryType