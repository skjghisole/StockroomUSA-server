import {
	GraphQLSchema
} from 'graphql'

import query from './queries/Root'
import mutation from './Mutation'

export default new GraphQLSchema({
	query,
	mutation
})