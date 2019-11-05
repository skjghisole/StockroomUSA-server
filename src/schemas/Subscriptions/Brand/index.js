import { withFilter } from 'graphql-subscriptions'
import { BrandType } from '../../Types'

import { BRAND_ADDED, BRAND_UPDATED, BRAND_REMOVED } from './constants' 

import { pubsub } from '../../../utils'

const BrandSubscription = {
	brandAdded: {
		type: BrandType,
		subscribe: withFilter(() =>
			pubsub.asyncIterator(BRAND_ADDED),
			// (payload, variables) => {
			() => {
				return true
			}
		),
		resolve(payload) {
			return payload
		}
	},
	brandUpdated: {
		type: BrandType,
		subscribe: withFilter(() => pubsub.asyncIterator(BRAND_UPDATED),() => {
			return true
		}),
		resolve(payload) {
			return payload
		}
	},
	brandRemoved: {
		type: BrandType,
		subscribe: withFilter(() => pubsub.asyncIterator(BRAND_REMOVED), () => {
			return true
		}),
		resolve(payload) {
			payload
		}
	}
}

export default BrandSubscription