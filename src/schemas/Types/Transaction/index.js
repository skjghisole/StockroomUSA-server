import { GraphQLObjectType, GraphQLList } from 'graphql';

import { AddressType, ProductType, CredentialType } from '../';

import { Product } from '../../../models/Product';

const TransactionType = new GraphQLObjectType({
	name: 'Transaction',
	fields: () => ({
		shippingAddres: {
			type: AddressType
		},
		items: {
			type: GraphQLList(ProductType),
			async resolve({ items }) {
				const ids = items.reduce((acc, curr) => acc.concat(curr.productId), [])
				const products = Product.find({ _id: { $in: ids }})
				return products.reduce((acc, curr) => {
					const itemDetails = items.find(({productId}) => curr._id == productId)
					return acc.concat(Object.assign({}, curr, { itemDetails }))
				}, [])
			}
		},
		recipient: {
			type: CredentialType
		}
	})
})

export default TransactionType;