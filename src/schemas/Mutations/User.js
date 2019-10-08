import {
	GraphQLString,
} from 'graphql'
import bcrypt from 'bcrypt'

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
		async resolve(_, { email, username, password, firstName, lastName }) {
			const user = new User({
				email,
				username,
				password,
				firstName,
				lastName
			})
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)
			user.password = hash

			return user.save()
		}
	}
}

export default UserMutation