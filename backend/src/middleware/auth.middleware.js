import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

/**
 * Authentication middleware
 * Supports both authentication and JWT tokens
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticate = async (req, res, next) => {
	// Check for authentication
	if (req.auth?.userId) {
		return next();
	}
	
	// Check for JWT token
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith('Bearer ')) {
		try {
			const token = authHeader.split(' ')[1];
			const decoded = jwt.verify(token, config.jwtSecret);
			
			// Add user info to request
			req.user = decoded;
			return next();
		} catch (error) {
			console.error('JWT verification error:', error);
		}
	}
	
	return res.status(401).json({ message: "Unauthorized - you must be logged in" });
};

/**
 * Route protection middleware
 * Alias for authenticate for backward compatibility
 */
export const protectRoute = authenticate;

/**
 * Admin authorization middleware
 * Requires authenticate middleware to run first
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const requireAdmin = async (req, res, next) => {
	try {
		// Check if authenticated with 
		if (req.auth?.userId) {
			const currentUser = await client.users.getUser(req.auth.userId);
			const isAdmin = config.adminEmail === currentUser.primaryEmailAddress?.emailAddress;
			
			if (isAdmin) {
				return next();
			}
		}
		
		// Check if authenticated with JWT
		if (req.user) {
			const isAdmin = config.adminEmail === req.user.email;
			
			if (isAdmin) {
				return next();
			}
		}

		return res.status(403).json({ message: "Unauthorized - you must be an admin" });
	} catch (error) {
		next(error);
	}
};
