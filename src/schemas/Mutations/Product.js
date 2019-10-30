import {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from 'graphql'

import {
	Product
} from '../../models'

import {
	ProductType,
	InputSizeType,
	InputImageType
} from '../Types'

import {
	PRODUCT_ADDED
} from '../Subscriptions/Product/constants'

const ProductMutation = {
	addProduct: {
		type: ProductType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) },
			description: { type: GraphQLString },
			quantity: { type: GraphQLInt },
			price: { type: GraphQLInt },
			sizes: { type: new GraphQLList(InputSizeType) },
			categoryIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
			brandIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
			images: { type: new GraphQLList(InputImageType) },
		},
		async resolve(parent, args, { req: { user, authError }, pubsub }) {
			const { name, quantity, price, categoryIds, brandIds, images, sizes, description } = args
			const product = new Product({
				name,
				quantity,
				price,
				categoryIds,
				brandIds,
				images,
				sizes,
				description
			})
			try {
				if (user.role === "ADMIN" && !authError) {
					const newProduct = await product.save()
					pubsub.publish(PRODUCT_ADDED, newProduct)
					return newProduct
				} else if (authError) {
					throw new Error(authError)
				} else {
					throw new Error('NOT AUTHORIZED!')
				}
			} catch (err) {
				return err
			}
		}
	},
	removeProduct: {
		type: ProductType,
		args: {
			id: {
				type: GraphQLID
			}
		},
		async resolve(parent, args, { req: { user, authError } }) {
			const { id } = args
			try {
				if (authError) throw new Error(authError)
				if (user.role !== "ADMIN") throw new Error("NOT AUTHORIZED")
				const removedProduct = await Product.findOneAndDelete({ _id: id })
				if (!removedProduct) throw new Error(`Product of ID: (${id}) not found!`)
				return removedProduct
			} catch (err) {
				return err
			}
		}
	},
	updateProduct: {
		type: ProductType,
		args: {
			id: {
				type: GraphQLID
			},
			name: {
				type: GraphQLString
			},
			description: {
				type: GraphQLString
			},
			quantity: {
				type: GraphQLInt
			},
			price: {
				type: GraphQLInt
			},
			sizes: {
				type: new GraphQLList(InputSizeType)
			},
			brandIds: {
				type: new GraphQLList(GraphQLID)
			},
			categoryIds: {
				type: new GraphQLList(GraphQLID)
			},
			images: {
				type: new GraphQLList(InputImageType)
			}
		},
		async resolve(parent, args, { req: { user, authError } }) {
			const { id, ...toUpdate } = args
			try {
				if (authError) throw new Error(authError)
				if (user.role !== "ADMIN") throw new Error("NOT AUTHORIZED")
				const updatedProduct = await Product.findOneAndUpdate({ _id: id }, toUpdate, { new: true })
				if (!updatedProduct) throw new Error("[Error]: Error in UPDATING product")
				return updatedProduct
			} catch (err) {
				return err
			}
		}
	}
}

export default ProductMutation