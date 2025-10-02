"use client";

import { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import MapboxInput from "./mapbox-input";

export default function Hero() {
	const { language } = useLanguage();
	const [deliveryType, setDeliveryType] = useState<"single" | "multiple">(
		"single"
	);
	const [pickupLocation, setPickupLocation] = useState("");
	const [deliveryLocation1, setDeliveryLocation1] = useState("");
	const [deliveryLocation2, setDeliveryLocation2] = useState("");

	return (
		<div className='relative min-h-[100vh] bg-gradient-to-br from-emerald-500 to-emerald-700 overflow-hidden pt-16 md:pt-20'>
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

			{/* Slanted bottom section - transparent to let background show */}
			<div
				className='absolute left-0 right-0 h-[300px] bg-transparent'
				style={{
					bottom: "-50px",
					transform: "skewY(-3deg)",
					transformOrigin: "top left",
				}}
			/>

			{/* Hero Content */}
			<div className='relative z-10 container mx-auto px-4 pt-8 pb-32'>
				{/* Main heading - matching website exactly */}
				<h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12 leading-relaxed max-w-4xl mx-auto mt-8'>
					{language === "ar"
						? "انقل بضاعتك وحمولتك أينما ترغب بطريقه سهلة وآمنة ."
						: "Transport your goods and cargo wherever you want in an easy and safe way."}
				</h1>

				{/* Order form */}
				<div className='max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20'>
					<div className='flex items-center justify-between mb-6'>
						<h2
							className={`text-xl md:text-2xl font-bold text-[#3BA776] ${
								language === "ar" ? "text-right" : "text-left"
							}`}>
							{language === "ar" ? "أطلب الآن" : "Order Now"}
						</h2>
						<div className='flex gap-2'>
							<div className='w-3 h-3 bg-[#3BA776] rounded-full'></div>
							<div className='w-3 h-3 bg-[#3BA776]/50 rounded-full'></div>
							<div className='w-3 h-3 bg-[#3BA776]/30 rounded-full'></div>
						</div>
					</div>

					{/* Delivery type selection */}
					<div
						className={`flex ${
							language === "ar" ? "justify-end" : "justify-start"
						} gap-8 mb-8`}>
						<label className='flex items-center gap-3 cursor-pointer group'>
							<input
								type='radio'
								name='deliveryType'
								checked={deliveryType === "single"}
								onChange={() => setDeliveryType("single")}
								className='w-5 h-5 text-[#3BA776] accent-[#3BA776] scale-110'
							/>
							<span className='text-gray-800 text-base font-medium group-hover:text-[#3BA776] transition-colors'>
								{language === "ar"
									? "موقع توصيل واحد"
									: "Single Delivery Location"}
							</span>
						</label>
						<label className='flex items-center gap-3 cursor-pointer group'>
							<input
								type='radio'
								name='deliveryType'
								checked={deliveryType === "multiple"}
								onChange={() => setDeliveryType("multiple")}
								className='w-5 h-5 text-[#3BA776] accent-[#3BA776] scale-110'
							/>
							<span className='text-gray-800 text-base font-medium group-hover:text-[#3BA776] transition-colors'>
								{language === "ar" ? "موقعين توصيل" : "Two Delivery Locations"}
							</span>
						</label>
					</div>

					{/* Location inputs */}
					<div className='flex flex-col lg:flex-row gap-4 items-center'>
						{language === "ar" ? (
							<>
								{/* Pickup Location - first in RTL */}
								<div className='flex-1 w-full'>
									<MapboxInput
										placeholder='موقع التحميل'
										value={pickupLocation}
										onChange={(value) => setPickupLocation(value)}
									/>
								</div>

								{/* Arrow */}
								<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2 animate-pulse'>
									←
								</div>

								{/* Delivery Location 1 */}
								<div className='flex-1 w-full'>
									<div style={{ textAlign: "start" }}>
										<MapboxInput
											placeholder='عنوان التسليم 1'
											value={deliveryLocation1}
											onChange={(value) => setDeliveryLocation1(value)}
										/>
									</div>
								</div>

								{/* Second Delivery Location - conditional */}
								{deliveryType === "multiple" && (
									<>
										<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2 animate-pulse'>
											←
										</div>
										<div className='flex-1 w-full'>
											<MapboxInput
												placeholder='عنوان التسليم 2'
												value={deliveryLocation2}
												onChange={(value) => setDeliveryLocation2(value)}
											/>
										</div>
									</>
								)}
							</>
						) : (
							<>
								{/* Pickup Location - first in LTR */}
								<div className='flex-1 w-full'>
									<MapboxInput
										placeholder='Pickup Location'
										value={pickupLocation}
										onChange={(value) => setPickupLocation(value)}
									/>
								</div>

								{/* Arrow */}
								<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2 animate-pulse'>
									→
								</div>

								{/* Delivery Location 1 */}
								<div className='flex-1 w-full'>
									<MapboxInput
										placeholder='Delivery Address 1'
										value={deliveryLocation1}
										onChange={(value) => setDeliveryLocation1(value)}
									/>
								</div>

								{/* Second Delivery Location - conditional */}
								{deliveryType === "multiple" && (
									<>
										<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2 animate-pulse'>
											→
										</div>
										<div className='flex-1 w-full'>
											<MapboxInput
												placeholder='Delivery Address 2'
												value={deliveryLocation2}
												onChange={(value) => setDeliveryLocation2(value)}
											/>
										</div>
									</>
								)}
							</>
						)}
					</div>

					{/* Continue button */}
					<div className='mt-8 text-center'>
						<button className='bg-[#3BA776] hover:bg-[#35996B] text-white font-bold py-4 px-12 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1'>
							{language === "ar" ? "متابعة الطلب" : "Continue Order"}
						</button>
					</div>
				</div>

				{/* App download section */}
				<div className='relative z-20 mt-20 text-center'>
					<p className='text-white text-lg md:text-xl lg:text-2xl font-medium mb-8 max-w-3xl mx-auto leading-relaxed bg-black/20 backdrop-blur-sm rounded-2xl p-6'>
						{language === "ar"
							? "نسعى لتحقيق شراكة متميزة عبر تسخير كل الإمكانات لخدمة عملائنا."
							: "We strive to achieve a distinguished partnership by harnessing all capabilities to serve our customers."}
					</p>
					<div className='flex justify-center gap-4 flex-wrap'>
						<a
							href='https://play.google.com/store/apps/details?id=com.shahen&gl=SA'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block transform hover:scale-105 transition-transform duration-300'>
							<img
								src='/google-play-badge.png'
								alt='Get it on Google Play'
								className='h-14 md:h-16 shadow-lg rounded-lg'
							/>
						</a>
						<a
							href='https://apps.apple.com/sa/app/shahen-%D8%B4%D8%AD%D9%86/id1568118147'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block transform hover:scale-105 transition-transform duration-300'>
							<img
								src='/app-store-badge.png'
								alt='Download on the App Store'
								className='h-14 md:h-16 shadow-lg rounded-lg'
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
