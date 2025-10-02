import React from "react";

const FixedBackground: React.FC = () => {
	return (
		<>
			{/* Fixed Background Layer */}
			<div className='fixed inset-0 z-0'>
				{/* Base gradient background */}
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'></div>

				{/* Gradient overlay for depth */}
				<div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/40'></div>

				{/* Animated particles/dots effect */}
				<div className='absolute inset-0 overflow-hidden'>
					<div className='absolute top-10 left-10 w-2 h-2 bg-emerald-500/30 rounded-full animate-pulse'></div>
					<div className='absolute top-1/4 right-1/4 w-3 h-3 bg-emerald-400/20 rounded-full animate-ping'></div>
					<div className='absolute bottom-1/3 left-1/3 w-1 h-1 bg-emerald-600/40 rounded-full animate-pulse delay-500'></div>
					<div className='absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-300/30 rounded-full animate-ping delay-1000'></div>
					<div className='absolute bottom-1/4 right-1/3 w-1 h-1 bg-emerald-500/50 rounded-full animate-pulse delay-700'></div>
				</div>

				{/* Geometric patterns */}
				<div className='absolute inset-0 opacity-5'>
					<div
						className='absolute inset-0'
						style={{
							backgroundImage: `
								radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
								radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
								linear-gradient(45deg, transparent 49%, rgba(16, 185, 129, 0.1) 50%, transparent 51%)
							`,
						}}></div>
				</div>
			</div>
		</>
	);
};

export default FixedBackground;
