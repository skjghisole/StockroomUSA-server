import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList
} from 'graphql'

import {
	UserType
} from './Types/User'

import {
	User
} from '../models'

// import query from './Queries/RootType'
import mutation from './Mutations/Root'

const query = new GraphQLObjectType({
	name: 'QueryType',
	fields: {
		users: {
			type: new GraphQLList(UserType),
			resolve() {
				return User.find({})
			}
		}
	}
})

export default new GraphQLSchema({
	query,
	mutation
})