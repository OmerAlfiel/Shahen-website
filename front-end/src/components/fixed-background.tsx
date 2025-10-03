import React from "react";

const FixedBackground: React.FC = () => {
	return (
		<>
			{/* Fixed Background Layer */}
			<div className='fixed inset-0 z-0 bg-gradient-to-br from-emerald-500 to-emerald-700 overflow-hidden'>
				{/* Background pattern with glass effect */}
				<div className='absolute inset-0 opacity-20'>
					<div
						className='absolute inset-0'
						style={{
							backgroundImage: `repeating-linear-gradient(
								45deg,
								transparent,
								transparent 35px,
								rgba(255,255,255,0.1) 35px,
								rgba(255,255,255,0.1) 70px
							)`,
						}}
					/>
				</div>

				{/* Decorative elements */}
				<div className='absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl'></div>
				<div className='absolute bottom-20 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl'></div>
				<div className='absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl'></div>
			</div>
		</>
	);
};

export default FixedBackground;
