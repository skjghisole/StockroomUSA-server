import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLID,
	GraphQLList
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { Product } from '../../models'

import { CategoryType, ProductType } from './' 

const BrandType = new GraphQLObjectType({
	name: 'Brand',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		categories: { type: new GraphQLList(CategoryType) },
		products: {
			type: new GraphQLList(ProductType),
			resolve({id}) {
				return Product.find({ brandIds: { $in: [id]  } })
			}
		}
	})
})

export default BrandType