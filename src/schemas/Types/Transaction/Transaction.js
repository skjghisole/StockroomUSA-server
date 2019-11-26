import { GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';

import { AddressType, ProductType, CredentialType, ItemDetailsType } from '../';

import { Product, User } from '../../../models/';

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
				const products = await Product.find({ _id: { $in: ids }})
				return itemDetails.reduce((acc, curr) => {
					const { images, name, sizes, quantity, categoryIds, brandIds, description, price, _id } = products.find(({ _id }) => _id.toString() === curr.productId.toString())
					const current = { itemDetails, id: _id, images, name, sizes, quantity, categoryIds, brandIds, description, price }
					return acc.concat(current)
				}, [])
			}
		},
		ownerId: {
			type: GraphQLID
		},
		recipient: {
			type: CredentialType,
			async resolve({ ownerId }) {
				const user = await User.findById(ownerId)
				return user.credentials;
			}
		}
	})
})

export default TransactionType;