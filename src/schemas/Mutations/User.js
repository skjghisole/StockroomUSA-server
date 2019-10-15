import {
	GraphQLString,
	GraphQLID
} from 'graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {
	TokenType
} from '../Types/User'

import {
	UserType
} from '../Types'

import {
	User
} from '../../models'

const UserMutation = {
	register: {
		type: UserType,
		args: {
			email: { type: GraphQLString },
			username: { type: GraphQLString },
			password: { type: GraphQLString },
			firstName: { type: GraphQLString },
			lastName: { type: GraphQLString },
			imageSrc: { type: GraphQLString }, 
			preloadImageSrc: { type: GraphQLString }
		},
		async resolve(_, { email, username, password, firstName, lastName, imageSrc, preloadImageSrc }) {
			const user = await User.findOne({ $or: [ { email }, { username } ] })
			if (user) {
				if (user.email === email) {
					throw "Sorry! But email has already been used"
				} else if (user.username === username) {
					throw "Sorry! But username has already been used"
				}
			}

			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)
			password = hash

			const newUser = new User({
				email,
				password,
				username,
				firstName,
				lastName,
				imageSrc,
				preloadImageSrc
			})

			return newUser.save()
		}
	},
	updateUser: {
		type: UserType,
		args: {
			id: { type: GraphQLID },
			password: { type: GraphQLString },
			reEnterPassword: { type: GraphQLString },
			firstName: { type: GraphQLString },
			lastName: { type: GraphQLString },
			imageSrc: { type: GraphQLString },
			preloadImageSrc: { type: GraphQLString }
		},
		async resolve(parent, args, { user, authError }) {
			const { id, ...toUpdate } = args
			try {
				if (authError) throw new Error(authError)
				if (user.id !== id) throw new Error('[ERROR] Error in UPDATING user! You are not authorized to update this user! Please Login again')
				const { password, reEnterPassword, ...rest } = toUpdate
				
				let filteredToUpdate
				if (password) {
					if (password !== reEnterPassword) throw new Error('[ERROR] Error in UPDATING user! Passwords doesn\'t match!')
					filteredToUpdate = { ...rest, password } 
				} else {
					filteredToUpdate = {...rest}
				}
				
				const updatedUser = await User.findOneAndUpdate({ _id: id }, filteredToUpdate, { new: true })
				return updatedUser
			} catch (err) {
				return err
			}
		}
	},
	login: {
		type: TokenType,
		args: {
			email: { type: GraphQLString },
			password: { type: GraphQLString }
		},
		async resolve(_, { email, password }) {
			const user = await User.findOne({ email })
			if (!user) {
				throw "Email not found!"
			}

			const validatePassword = await bcrypt.compare(password, user.password)
			if (!validatePassword) {
				throw "Invalid Password!"
			}
			const token = await jwt.sign({ data: user }, process.env.SECRET_KEY, { expiresIn: Math.floor(60 * 60 * 24) })
			return { token }
		}
	},
}

export default UserMutation