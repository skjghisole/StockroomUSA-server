import jwt from 'jsonwebtoken'
import { User } from '../models'
import {
	USER_ROLE,
	ADMIN_ROLE
} from '../constants'

const verifyToken = async (token, role) => {
	const { data } = await jwt.verify(token, process.env.SECRET_KEY)
	const user = await User.findOne({ _id: data._id })
	if (user) {
		if (user.role !== role && user.role !== ADMIN_ROLE) throw new Error('Role not authorized')
		return true
	} else {
		throw new Error('Invalid Token!')
	}
}

const parseBearerToken = (bearerToken) => {
	const [, token] = bearerToken.split(' ')
	return token
}

const isAuthenticated = async (req, result, args=null, role=USER_ROLE) => {
	const headerAuth = req.headers.authorization
	if (!headerAuth) {
		throw new Error("Unauthenticated!")
	}

	const token = parseBearerToken(headerAuth)
	const isVerified = await verifyToken(token, role)
	if (isVerified) {
		if (typeof result == 'function') {
			return args ? result.apply(args) : result.apply()
		}
		return result
	} else {
		throw new Error("Unauthenticated!")
	}
}

const adminAuthenticated = async (req, result, args) => {
	return isAuthenticated(req, result, args, ADMIN_ROLE)
}

export {
	adminAuthenticated,
	isAuthenticated
}