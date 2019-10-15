import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import {
	ImageType
} from './'

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		image: {
			type: ImageType,
			resolve({ imageSrc, preloadImageSrc }) {
				return {
					imageSrc,
					preloadImageSrc
				}
			}
		},
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	})
})

export default CategoryType