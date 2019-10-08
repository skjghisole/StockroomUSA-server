import {
	GraphQLString,
	GraphQLObjectType
} from 'graphql'

const CredentialType = new GraphQLObjectType({
	name: 'UserCredential',
	fields: () => ({
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString }
	})
})

export default CredentialType