import {
	GraphQLString,
} from 'graphql'

import {
	UserType
} from '../Types'

import {
	User
} from '../../models'

const UserMutation = {
	register: {
		type: UserType,
		args: {
			email: { type: GraphQLString },
			username: { type: GraphQLString },
			password: { type: GraphQLString },
			firstName: { type: GraphQLString },
			lastName: { type: GraphQLString }
		},
		resolve(_, { email, username, password, firstName, lastName }) {
			const user = new User({
				email,
				username,
				password,
				firstName,
				lastName
			})
			return user.save()
		}
	}
}

export default UserMutation