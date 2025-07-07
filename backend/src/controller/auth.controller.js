import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { config } from '../config/env.js';

export const authCallback = async (req, res, next) => {
	try {
		const { id, firstName, lastName, imageUrl, email } = req.body;
		
		// This is a auth callback
		const user = await User.findOne({ id: id });

		if (!user) {
			// Create new user
			user = await User.create({
				id: id,
				fullName: `${firstName || ""} ${lastName || ""}`.trim(),
				imageUrl,
				email
			});
		}

		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in auth callback", error);
		next(error);
	}
};

/**
 * Redirects to Google OAuth consent screen
 */
export const googleAuthRedirect = (req, res) => {
	const { clientId, redirectUri } = config.google;
	
	const scope = [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email',
	].join(' ');

	const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
		scope
	)}&access_type=offline&prompt=consent`;

	res.redirect(authUrl);
};

/**
 * Handles the OAuth callback from Google
 */
export const googleAuthCallback = async (req, res, next) => {
	const code = req.query.code;
	const { clientId, clientSecret, redirectUri } = config.google;
	const frontendUrl = config.frontendUrl;

	try {
		// Exchange code for tokens
		const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
			params: {
				code,
				client_id: clientId,
				client_secret: clientSecret,
				redirect_uri: redirectUri,
				grant_type: 'authorization_code',
			},
		});

		const { access_token } = tokenRes.data;

		// Get user info with the access token
		const userRes = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: { Authorization: `Bearer ${access_token}` },
		});

		const googleUser = userRes.data;
		
		// Check if user exists in our database
		let user = await User.findOne({ email: googleUser.email });
		
		if (!user) {
			// Create new user if doesn't exist
			user = await User.create({
				fullName: googleUser.name,
				email: googleUser.email,
				imageUrl: googleUser.picture,
				googleId: googleUser.id,
			});
		} else if (!user.googleId) {
			// Update existing user with Google ID
			user.googleId = googleUser.id;
			await user.save();
		}
		
		// Create a simple JWT token for authentication
		const token = jwt.sign(
			{ 
				userId: user._id,
				email: user.email,
				fullName: user.fullName,
				imageUrl: user.imageUrl
			}, 
			config.jwtSecret,
			{ expiresIn: '7d' }
		);
		
		// Redirect to frontend with user info and token
		res.redirect(`${frontendUrl}/auth-callback?name=${encodeURIComponent(user.fullName)}&email=${encodeURIComponent(user.email)}&token=${token}`);
	} catch (err) {
		console.error('OAuth error:', err);
		res.status(500).send('Authentication failed');
	}
};
