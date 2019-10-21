import {
	GraphQLObjectType
} from 'graphql'

import {
	BrandSubscription
} from './'

const fields = {
	...BrandSubscription
}

const SubscriptionType = new GraphQLObjectType({
	name: 'SubscriptionType',
	fields
})

export default SubscriptionType