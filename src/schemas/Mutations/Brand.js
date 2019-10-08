import {
	GraphQLString,
} from 'graphql'

import {
	Brand,
} from '../../models'

import {
	BrandType,
} from '../Types'

import {
	adminAuthenticated
} from '../../utils'


const BrandMutation = {
	addBrand: {
		type: BrandType,
		args: {
			name: { type: GraphQLString }
		},
		resolve(parent, args, ctx) {
			const { name } = args
			const brand = new Brand({
				name
			})

			return adminAuthenticated(ctx, brand.save.bind(brand))
		}
	},
}

export default BrandMutation