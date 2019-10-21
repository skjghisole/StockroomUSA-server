import {
	GraphQLString,
	GraphQLID,
	GraphQLList
} from 'graphql'

import {
	Brand,
} from '../../models'

import {
	BrandType,
} from '../Types'

import {
	BRAND_ADDED
} from '../Subscriptions/Brand/constants'

const BrandMutation = {
	addBrand: {
		type: BrandType,
		args: {
			name: { type: GraphQLString },
			imageSrc: {
				type: GraphQLString
			},
			preloadImageSrc: {
				type: GraphQLString
			}
		},
		resolve(parent, args, { req: { user, authError }, pubsub }) {
			const { name, imageSrc, preloadImageSrc } = args
			const brand = new Brand({
				name,
				imageSrc,
				preloadImageSrc
			})
			if (authError) {
				throw new Error(authError)
			} else if (user.role !== "ADMIN") {
				throw new Error("NOT AUTHORIZED!")
			} else {
				const brandAdded = brand.save()
				pubsub.publish(BRAND_ADDED, brandAdded)
				return brandAdded
			}
		}
	},
	removeBrand: {
		type: BrandType,
		args: {
			id: { type: GraphQLID }
		},
		async resolve(_, args, { req: { user, authError } }) {
			const { id } = args
			try {
				if (authError) {
					throw new Error(authError)
				} else if (user.role !== "ADMIN") {
					throw new Error("NOT AUTHORIZED!")
				} else {
					const removed = await Brand.findOneAndDelete({ _id: id })
					if (!removed) throw new Error(`Brand of ID:(${id}) not found!`)
					return removed
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
			categoryIds: { type: new GraphQLList(GraphQLID) }
		},
		async resolve(parent, args, { req: { user, authError } }) {
			const { id, ...toUpdate } = args
			try {
				if (authError) throw new Error(authError)
				if (user.role !== "ADMIN") throw new Error("NOT AUTHORIZED")

				const updatedBrand = await Brand.findOneAndUpdate({ _id: id }, toUpdate, { new: true })
				if (!updatedBrand) throw new Error("[Error]: Error in UPDATING brand")
				return updatedBrand
			} catch (err) {
				return err
			}
		}
	}
}

export default BrandMutation