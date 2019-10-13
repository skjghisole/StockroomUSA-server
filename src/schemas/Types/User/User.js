import {
	GraphQLString,
	GraphQLObjectType
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { CredentialType, RoleType } from './'

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		email: { type: GraphQLString },
		username: { type: GraphQLString },
		// password: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		role: { type: RoleType },
		credentials: {
			type: CredentialType,
			resolve(parent) {
				const { firstName, lastName } = parent
				return {
					firstName,
					lastName
				}
			}
		}
	})
})

export default UserType