import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLID
} from 'graphql'

import {
  GraphQLDateTime,
} from 'graphql-iso-date'

import { ImageType } from '../'
import { CredentialType, RoleType } from './'

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		email: { type: GraphQLString },
		username: { type: GraphQLString },
		// password: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime },
		role: { type: RoleType },
		profilePicture: {
			type: ImageType,
			resolve({ imageSrc, preloadImageSrc }) {
				return {
					imageSrc,
					preloadImageSrc
				}
			}
		},
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