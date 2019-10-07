import {
	GraphQLString,
} from 'graphql'

import {
	Category,
} from '../../models'

import {
	CategoryType,
} from '../Types'

const CategoryMutation = {
	addCategory: {
		type: CategoryType,
		args: {
			name: { type: GraphQLString }
		},
		resolve(parent, args) {
			const { name } = args
			const category = new Category({
				name
			})
			return category.save()
		}
	},
}

export default CategoryMutation