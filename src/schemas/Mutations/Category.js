import {
	GraphQLString,
	GraphQLID
} from 'graphql'

import {
	Category,
} from '../../models'

import {
	CategoryType,
} from '../Types'

import {
	CATEGORY_ADDED
} from '../Subscriptions/Category/constants'

const CategoryMutation = {
	addCategory: {
		type: CategoryType,
		args: {
			name: { type: GraphQLString },
			imageSrc: { type: GraphQLString },
			preloadImageSrc: { type: GraphQLString }
		},
		async resolve(parent, args, { req: { user, authError }, pubsub }) {
			const { name, imageSrc, preloadImageSrc } = args
			try {
				const category = new Category({
					name,
					imageSrc,
					preloadImageSrc
				})
				if (authError) {
					throw new Error(authError)
				} else if (user.role !== "ADMIN") {
					throw new Error("NOT AUTHORIZED")
				} else {
					const newCategory = await category.save()
					pubsub.publish(CATEGORY_ADDED, newCategory)
					return newCategory
				}
			} catch (err) {
				return err instanceof Error ? err.message : err
			}
			
		}
	},
	removeCategory: {
		type: CategoryType,
		args: {
			id: { type: GraphQLID }
		},
		async resolve(parent, args, { authError, user }) {
			const { id } = args
			try {
				if (authError) {
					throw new Error(authError)
				} else if (user.role !== "ADMIN") {
					throw new Error("NOT AUTHORIZED!")
				}

				const removedCategory = await Category.findOneAndDelete({ _id: id })
				if (!removedCategory) throw new Error(`Category of ID: (${id}) not found!`)
				return removedCategory 
			} catch (err) {
				return err
			}
		}
	},
	updateCategory: {
		type: CategoryType,
		args: {
			id: { type: GraphQLID },
			name: { type: GraphQLString }
		},
		async resolve(parent, args, { authError, user }) {
			const { id, ...toUpdate } = args
			try {
				if (authError) throw new Error(authError)
				if (user.role !== "ADMIN") throw new Error("NOT AUTHORIZED!")
				
				const updatedCategory = await Category.findOneAndUpdate({ _id: id }, toUpdate, { new: true })
				if (!updatedCategory) throw new Error("[Error] Error in UPDATING category")
				return updatedCategory
			} catch (err) {
				return err
			}
		}
	}
}

export default CategoryMutation