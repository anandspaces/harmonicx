import { useChatStore } from "../stores/useChatStore";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import ScrollArea from "./Scrollarea";
import UsersListSkeleton from "./UsersListSkeleton";

const UsersList = () => {
	const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

	return (
		<div className="border-r border-zinc-800 w-full max-w-xs h-full bg-zinc-900">
			<div className="flex flex-col h-full">
				{/* Scrollable List - Adjusted height */}
				<ScrollArea className="h-[calc(100vh-180px)]">
					<div className="space-y-2 p-4">
						{isLoading ? (
							<UsersListSkeleton />
						) : (
							users.map((user) => (
								<div
									key={user._id}
									onClick={() => setSelectedUser(user)}
									className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
										${selectedUser?.id === user.id ? "bg-zinc-800" : "hover:bg-zinc-800/50"}`}
								>
									{/* Avatar (Using Tailwind) */}
									<div className='relative'>
										<Avatar className='size-8 md:size-12'>
											<AvatarImage src={user.imageUrl} />
											<AvatarFallback>{user.fullName[0]}</AvatarFallback>
										</Avatar>

										{/* Online Indicator */}
										<div
											className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-zinc-900
                        ${onlineUsers.has(user.id) ? "bg-green-500" : "bg-zinc-500"}`}
										/>
									</div>

									{/* User Name */}
									<div className="flex-1 min-w-0 hidden lg:block">
										<span className="font-medium text-white truncate">{user.fullName}</span>
									</div>
								</div>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default UsersList;
