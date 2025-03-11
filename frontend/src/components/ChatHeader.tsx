import { useChatStore } from "../stores/useChatStore";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const ChatHeader = () => {
	const { selectedUser, onlineUsers } = useChatStore();

	if (!selectedUser) return null;

	return (
		<div className="p-4 border-b border-zinc-800 bg-zinc-900">
			<div className="flex items-center gap-3">
				{/* Avatar */}
				<Avatar>
					<AvatarImage src={selectedUser.imageUrl} />
					<AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
				</Avatar>

				{/* User Info */}
				<div>
					<h2 className="font-medium text-white">{selectedUser.fullName}</h2>
					<p className={`text-sm ${onlineUsers.has(selectedUser.clerkId) ? "text-green-400" : "text-zinc-400"}`}>
						{onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
					</p>
				</div>
			</div>
		</div>
	);
};
export default ChatHeader;
