import {
	GraphQLObjectType
} from 'graphql'

import {
	BrandSubscription,
	CategorySubscription,
	ProductSubscription
} from './'

const fields = {
	...BrandSubscription,
	...CategorySubscription,
	...ProductSubscription
}

const SubscriptionType = new GraphQLObjectType({
	name: 'SubscriptionType',
	fields
})

export default SubscriptionType