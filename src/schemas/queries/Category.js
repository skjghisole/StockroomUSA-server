import {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
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
		resolve(parent, args) {
			return Category.findById(args.id)
		}
	},
	categories: {
		type: new GraphQLList(CategoryType),
		resolve() {
			return Category.find({})
		}
	},
}

export default CategoryQueries