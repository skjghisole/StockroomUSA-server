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


const BrandMutation = {
	addBrand: {
		type: BrandType,
		args: {
			name: { type: GraphQLString }
		},
		resolve(parent, args, { user, authError }) {
			const { name } = args
			const brand = new Brand({
				name
			})
			if (authError) {
				throw new Error(authError)
			} else if (user.role !== "ADMIN") {
				throw new Error("NOT AUTHORIZED!")
			} else {
				return brand.save()
			}
		}
	},
	removeBrand: {
		type: BrandType,
		args: {
			id: { type: GraphQLID }
		},
		async resolve(_, args, { user, authError }) {
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
		async resolve(parent, args, { user, authError }) {
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