import { withFilter } from 'graphql-subscriptions'

import { PRODUCT_ADDED } from './constants'
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
	}
}

export default ProductSubscription