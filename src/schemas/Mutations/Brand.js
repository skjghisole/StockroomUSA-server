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
		resolve(parent, args) {
			const { name } = args
			const brand = new Brand({
				name
			})
			return brand.save()
		}
	},
}

export default BrandMutation