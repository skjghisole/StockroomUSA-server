import {
	GraphQLObjectType,
} from 'graphql'

import {
	BrandMutations,
	CategoryMutations,
	ProductMutations,
	UserMutations
} from './'

const fields = {
	...BrandMutations,
	...CategoryMutations,
	...ProductMutations,
	...UserMutations
}

const MutationType = new GraphQLObjectType({
	name: 'MutationType',
	fields
})

export default MutationType