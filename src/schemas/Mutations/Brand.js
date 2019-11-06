import {
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from 'graphql'

import {
	Brand,
} from '../../models'

import {
	BrandType,
	InputImageType
} from '../Types'

import {
	BRAND_ADDED,
	BRAND_UPDATED,
	BRAND_REMOVED
} from '../Subscriptions/Brand/constants'

const BrandMutation = {
	addBrand: {
		type: BrandType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) },
			image: { type: InputImageType }
		},
		async resolve(parent, args, { req: { user, authError }, pubsub }) {
			const { name, image } = args
			const brand = new Brand({
				name,
				image
			})
			try {
				if (authError) {
					throw new Error(authError)
				} else if (user.role !== "ADMIN") {
					throw new Error("NOT AUTHORIZED!")
				} else {
					const brandAdded = await brand.save()
					pubsub.publish(BRAND_ADDED, brandAdded)
					return brandAdded
				}
			} catch (err) {
				return err
			}
		}
	},
	removeBrand: {
		type: BrandType,
		args: {
			id: { type: GraphQLID }
		},
		async resolve(_, args, { req: { user, authError }, pubsub }) {
			const { id } = args
			try {
				if (authError) {
					throw new Error(authError)
				} else if (user.role !== "ADMIN") {
					throw new Error("NOT AUTHORIZED!")
				} else {
					const removedBrand = await Brand.findOneAndDelete({ _id: id })
					if (!removedBrand) throw new Error(`Brand of ID:(${id}) not found!`)
					pubsub.publish(BRAND_REMOVED, removedBrand)
					return removedBrand
				}
			} catch (err) {
				return err
			}
		}
	},
	updateBrand: {
		type: BrandType,
		args: {
			id: { type: GraphQLID },
			name: { type: GraphQLString },
			image: { type: InputImageType },
			categoryIds: { type: new GraphQLList(GraphQLID) }
		},
		async resolve(parent, args, { req: { user, authError }, pubsub }) {
			const { id, ...toUpdate } = args
			try {
				if (authError) throw new Error(authError)
				if (user.role !== "ADMIN") throw new Error("NOT AUTHORIZED")

				const updatedBrand = await Brand.findOneAndUpdate({ _id: id }, toUpdate, { new: true })
				if (!updatedBrand) throw new Error("[Error]: Error in UPDATING brand")
				pubsub.publish(BRAND_UPDATED, updatedBrand)
				return updatedBrand
			} catch (err) {
				return err
			}
		}
	}
}

export default BrandMutation