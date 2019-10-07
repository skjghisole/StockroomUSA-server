import {
	GraphQLString,
	GraphQLObjectType
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

const CredentialType = new GraphQLObjectType({
	name: 'UserCredential',
	fields: () => ({
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString }
	}),
	resolve(parent) {
		const { firstName, lastName } = parent
		return {
			firstName,
			lastName
		}
	}
})


const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		email: { type: GraphQLString },
		username: { type: GraphQLString },
		password: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		credentials: { type: CredentialType }
	})
})

export default UserType