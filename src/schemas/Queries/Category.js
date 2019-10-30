import {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} from 'graphql'

import { Category } from '../../models'

import {
	CategoryType,
} from '../Types'

const CategoryQueries = {
	category: {
		type: CategoryType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		async resolve(parent, args) {
			return await Category.findById(args.id)
		}
	},
	categories: {
		type: new GraphQLList(CategoryType),
		async resolve() {
			return await Category.find({})
		}
	},
}

export default CategoryQueries