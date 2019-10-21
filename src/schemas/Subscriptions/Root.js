import {
	GraphQLObjectType
} from 'graphql'

import {
	BrandSubscription,
	CategorySubscription
} from './'

const fields = {
	...BrandSubscription,
	...CategorySubscription
}

const SubscriptionType = new GraphQLObjectType({
	name: 'SubscriptionType',
	fields
})

export default SubscriptionType