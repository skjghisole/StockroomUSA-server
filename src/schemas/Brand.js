import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLID,
	GraphQLList
} from 'graphql'

import { CategoryType } from './Types' 

const BrandType = new GraphQLObjectType({
	name: 'Brand',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		categories: { type: new GraphQLList(CategoryType) }
	})
})

export default BrandType