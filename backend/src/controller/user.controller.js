import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async (req, res, next) => {
	try {
		// Check user authentication
		const authResult = verifyUserAuth(req);
		if (!authResult.authenticated) {
			return res.status(401).json({ message: authResult.message });
		}
		
		const currentUserId = authResult.user.authType === 'test' 
			? authResult.user.userId 
			: authResult.user.id;
			
		const users = await User.find({ 
			$or: [
				{ id: { $ne: currentUserId } },
				{ _id: { $ne: authResult.user.userId } }
			]
		});
		
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getMessages = async (req, res, next) => {
	try {
		// Check user authentication
		const authResult = verifyUserAuth(req);
		if (!authResult.authenticated) {
			return res.status(401).json({ message: authResult.message });
		}
		
		const myId = authResult.user.authType === 'test' 
			? authResult.user.userId 
			: authResult.user.userId;
			
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};
