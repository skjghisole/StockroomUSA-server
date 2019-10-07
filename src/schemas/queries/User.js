import {
	GraphQLString,
	GraphQLList,
} from 'graphql'

import {
	UserType
} from '../Types'

import {
	User
} from '../../models'

const UserQueries = {
	users: {
		type: new GraphQLList(UserType),
		args: {
			username: { type: GraphQLString },
			email: { type: GraphQLString }
		},
		resolve() {
			return User.find({})
		}
	}
}

export default UserQueries