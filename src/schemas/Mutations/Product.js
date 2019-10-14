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
	ProductType
} from '../Types'


const ProductMutation = {
	addProduct: {
		type: ProductType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) },
			quantity: { type: GraphQLInt },
			categoryIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
			brandIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) }
		},
		resolve(parent, args, ctx) {
			const { name, quantity, categoryIds, brandIds } = args
			const { user, authError } = ctx
			const product = new Product({
				name,
				quantity,
				categoryIds,
				brandIds
			})
			
			if (user.role === "ADMIN" && !authError) {
				return product.save()
			} else if (authError) {
				throw new Error(authError)
			} else {
				throw new Error('NOT AUTHORIZED!')
			}
		}
	},
	removeProduct: {
		type: ProductType,
		args: {
			id: GraphQLID
		},
		async resolve(parent, args, { user, authError }) {
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
	}
}

export default ProductMutation