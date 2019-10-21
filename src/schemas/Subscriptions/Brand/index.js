import { withFilter } from 'graphql-subscriptions'
import { BrandType } from '../../Types'

import { BRAND_ADDED } from './constants' 

import { pubsub } from '../../../utils'

const BrandSubscription = {
	brandAdded: {
		type: BrandType,
		subscribe: withFilter(() => pubsub.asyncIterator(BRAND_ADDED),
			(payload, variables) => {
				return true
			}),
		resolve(payload) {
			return payload
		}
	}
}

export default BrandSubscription