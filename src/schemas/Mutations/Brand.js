import {
	GraphQLString,
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
}

export default BrandMutation