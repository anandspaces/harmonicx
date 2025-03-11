type StatsCardProps = {
	icon: React.ElementType;
	label: string;
	value: string;
	bgColor: string;
	iconColor: string;
};

const StatsCard = ({ bgColor, icon: Icon, iconColor, label, value }: StatsCardProps) => {
	return (
		<div className="bg-zinc-800/50 border border-zinc-700/50 p-6 rounded-xl hover:bg-zinc-800/80 transition-colors">
			<div className="flex items-center gap-4">
				{/* Icon Container */}
				<div className={`p-3 rounded-lg ${bgColor}`}>
					<Icon className={`w-6 h-6 ${iconColor}`} />
				</div>

				{/* Text Content */}
				<div>
					<p className="text-sm text-zinc-400">{label}</p>
					<p className="text-2xl font-bold text-white">{value}</p>
				</div>
			</div>
		</div>
	);
};
export default StatsCard;
