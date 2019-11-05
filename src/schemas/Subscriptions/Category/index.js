import { withFilter } from 'graphql-subscriptions'
import { CategoryType } from '../../Types'

import { CATEGORY_ADDED, CATEGORY_UPDATED, CATEGORY_REMOVED } from './constants' 

import { pubsub } from '../../../utils'

const CategorySubscription = {
	categoryAdded: {
		type: CategoryType,
		subscribe: withFilter(() =>
			pubsub.asyncIterator(CATEGORY_ADDED),
		// (payload, variables) => {
			() => {
				return true
			}
		),
		resolve(payload) {
			return payload
		}		
	},
	categoryUpdated: {
		type: CategoryType,
		subscribe: withFilter(() => pubsub.asyncIterator(CATEGORY_UPDATED), () => {
			return true
		}),
		resolve(payload) {
			return payload
		}
	},
	categoryRemoved: {
		type: CategoryType,
		subscribe: withFilter(() => pubsub.asyncIterator(CATEGORY_REMOVED), () => {
			return true
		}),
		resolve(payload) {
			return payload
		}
	}
}

export default CategorySubscription