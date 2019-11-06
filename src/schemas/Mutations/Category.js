import {
	GraphQLString,
	GraphQLID,
	GraphQLNonNull,
	GraphQLList
} from 'graphql'

import {
	Category,
} from '../../models'

import {
	CategoryType,
	InputImageType
} from '../Types'

import {
	CATEGORY_ADDED,
	CATEGORY_UPDATED,
	CATEGORY_REMOVED
} from '../Subscriptions/Category/constants'

const CategoryMutation = {
	addCategory: {
		type: CategoryType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) },
			image: { type: InputImageType },
			parentCategoryIds: { type: new GraphQLList(GraphQLID) }
		},
		async resolve(parent, args, { req: { user, authError }, pubsub }) {
			const { name, image, parentCategoryIds } = args
			try {
				const category = new Category({
					name,
					image,
					parentCategoryIds
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
				return err
			}
			
		}
	},
	removeCategory: {
		type: CategoryType,
		args: {
			id: { type: GraphQLID }
		},
		async resolve(parent, args, { req: { authError, user }, pubsub }) {
			const { id } = args
			try {
				if (authError) {
					throw new Error(authError)
				} else if (user.role !== "ADMIN") {
					throw new Error("NOT AUTHORIZED!")
				}

				const removedCategory = await Category.findOneAndDelete({ _id: id })
				if (!removedCategory) throw new Error(`Category of ID: (${id}) not found!`)
				pubsub.publish(CATEGORY_REMOVED, removedCategory)
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
			name: { type: GraphQLString },
			image: { type: InputImageType }
		},
		async resolve(parent, args, { req: { authError, user }, pubsub }) {
			const { id, ...toUpdate } = args
			try {
				if (authError) throw new Error(authError)
				if (user.role !== "ADMIN") throw new Error("NOT AUTHORIZED!")
				
				const updatedCategory = await Category.findOneAndUpdate({ _id: id }, toUpdate, { new: true })
				if (!updatedCategory) throw new Error("[Error] Error in UPDATING category")
				pubsub.publish(CATEGORY_UPDATED, updatedCategory)
				return updatedCategory
			} catch (err) {
				return err
			}
		}
	}
}

export default CategoryMutation