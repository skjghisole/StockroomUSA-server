import {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from 'graphql'

import { Brand } from '../../models'

import {
	BrandType,
} from '../Types'


const BrandQueries = {
	brand: {
		type: BrandType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parent, args) {
			return Brand.findById(args.id)
		}
	},
	brands: {
		type: new GraphQLList(BrandType),
		resolve(_, __) {
			return Brand.find({})
		}
	},
}

export default BrandQueries