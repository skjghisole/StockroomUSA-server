import { withFilter } from 'graphql-subscriptions'

import { PRODUCT_ADDED, PRODUCT_UPDATED, PRODUCT_REMOVED } from './constants'
import { ProductType } from '../../Types'
import { pubsub } from '../../../utils'

const ProductSubscription = {
	productAdded: {
		type: ProductType,
		subscribe: withFilter(() => pubsub.asyncIterator(PRODUCT_ADDED),
			() => {
				return true
			}
			),
		resolve(payload) {
			return payload
		}
	},
	productUpdated: {
		type: ProductType,
		subscribe: withFilter(() => pubsub.asyncIterator(PRODUCT_UPDATED), () => {
			return true
		}),
		resolve(payload) {
			return payload
		}
	},
	productRemoved: {
		type: ProductType,
		subscribe: withFilter(() => pubsub.asyncIterator(PRODUCT_REMOVED), () => {
			return true
		}),
		resolve(payload) {
			return payload
		}
	}
}

export default ProductSubscription