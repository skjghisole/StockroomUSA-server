import { GraphQLObjectType, GraphQLList } from 'graphql';

import { AddressType, ProductType, CredentialType, ItemDetailsType } from '../';

import { Product } from '../../../models/Product';

const TransactionType = new GraphQLObjectType({
	name: 'Transaction',
	fields: () => ({
		shippingAddress: {
			type: AddressType
		},
		itemDetails: {
			type: new GraphQLList(ItemDetailsType),
		},
		items: {
			type: GraphQLList(ProductType),
			async resolve({ itemDetails }) {
				const ids = itemDetails.reduce((acc, curr) => acc.concat(curr.productId), [])
				console.log(ids)
				const products = await Product.find({ _id: { $in: ids }})
				console.log(products)
				return products.reduce((acc, curr) => {
					const itemDetails = itemDetails.find(({ productId }) => curr._id == productId)
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