import {
	GraphQLID,
	GraphQLList,
	GraphQLString
} from 'graphql'

import { Brand } from '../../models'

import {
	BrandType,
} from '../Types'


const BrandQueries = {
	brand: {
		type: BrandType,
		args: {
			id: { type: GraphQLID },
			name: { type: GraphQLString }
		},
		async resolve(parent, args) {
			const { id, ...rest } = args
			let query
			if (id) {
				query = Object.assign({}, rest, { _id: id })
			} else {
				query = Object.assign({}, rest)
			}
			return await Brand.findOne(query)
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