import {
	GraphQLString,
	GraphQLList,
} from 'graphql'

import {
	UserType,
} from '../Types'

import {
	User
} from '../../models'

import {
	isAuthenticated
} from '../../utils'

const UserQueries = {
	users: {
		type: new GraphQLList(UserType),
		resolve(_, args, ctx) {
			return isAuthenticated(ctx, User.find, {})
		}
	},
	user: {
		type: UserType,
		args: {
			username: { type: GraphQLString },
		},
		resolve(_, { username }) {
			return User.findOne({ username })
		}
	}
}

export default UserQueries