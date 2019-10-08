import {
	GraphQLObjectType,
	GraphQLList
} from 'graphql'

import {
	UserType
} from '../Types'

import {
	User
} from '../../models'


// import {
	// BrandQueries,
	// CategoryQueries,
	// ProductQueries,
	// UserQueries
// } from './'

// const fields = {
	// ...BrandQueries,
	// ...CategoryQueries,
	// ...ProductQueries,
	// ...UserQueries
// }

const QueryType = new GraphQLObjectType({
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

export default QueryType