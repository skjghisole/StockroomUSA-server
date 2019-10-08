import {
	GraphQLSchema,
	// GraphQLObjectType,
	// GraphQLList
} from 'graphql'

// import {
// 	UserType
// } from './Types/User'

// import {
// 	User
// } from '../models'

import query from './Queries/Root'
import mutation from './Mutations/Root'

// const QueryType = new GraphQLObjectType({
// 	name: 'QueryType',
// 	fields: {
// 		users: {
// 			type: new GraphQLList(UserType),
// 			resolve() {
// 				return User.find({})
// 			}
// 		}
// 	}
// })

export default new GraphQLSchema({
	query: query,
	mutation
})