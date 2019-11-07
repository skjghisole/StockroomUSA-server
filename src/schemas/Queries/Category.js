import {
	GraphQLID,
	GraphQLList,
	GraphQLString
} from 'graphql'

import { Category } from '../../models'

import {
	CategoryType,
} from '../Types'

const CategoryQueries = {
	category: {
		type: CategoryType,
		args: {
			id: { type: GraphQLID },
			name: { type: GraphQLString }
		},
		async resolve(parent, args) {
			const { id, ...rest } = args
			let query
			if (id) {
				query = Object.assign({}, rest, { _id: id })
			} else {
				query = Object.assign({}, rest)
			}
			return await Category.findOne(query)
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