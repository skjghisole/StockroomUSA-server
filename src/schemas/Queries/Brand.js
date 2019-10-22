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
		async resolve(parent, args) {
			return await Brand.findById(args.id)
		}
	},
	brands: {
		type: new GraphQLList(BrandType),
		async resolve() {
			return await Brand.find({})
		}
	},
}

export default BrandQueries