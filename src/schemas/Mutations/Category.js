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
		resolve(parent, args, { authError, user }) {
			const { name } = args
			const category = new Category({
				name
			})
			if (authError) {
				throw new Error(authError)
			} else if (user.role !== "ADMIN") {
				throw new Error("NOT AUTHORIZED")
			} else {
				return category.save()
			}
		}
	},
}

export default CategoryMutation