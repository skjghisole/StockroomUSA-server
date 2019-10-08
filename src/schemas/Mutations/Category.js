import {
	GraphQLString,
} from 'graphql'

import {
	Category,
} from '../../models'

import {
	CategoryType,
} from '../Types'

import {
	adminAuthenticated
} from '../../utils'


const CategoryMutation = {
	addCategory: {
		type: CategoryType,
		args: {
			name: { type: GraphQLString }
		},
		resolve(parent, args, ctx) {
			const { name } = args
			const category = new Category({
				name
			})
			return adminAuthenticated(ctx, category.save.bind(category))
		}
	},
}

export default CategoryMutation