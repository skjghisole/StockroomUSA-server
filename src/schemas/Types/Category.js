import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import {
	ImageType
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
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})

export default CategoryType