import {
	GraphQLObjectType,
} from 'graphql'

import {
	BrandMutations,
	CategoryMutations,
	ProductMutations,
	UserMutations,
	TransactionMutations
} from './'

const fields = {
	...BrandMutations,
	...CategoryMutations,
	...ProductMutations,
	...UserMutations,
	...TransactionMutations
}

const MutationType = new GraphQLObjectType({
	name: 'MutationType',
	fields
})

export default MutationType