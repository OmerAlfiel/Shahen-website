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
	const [qty, setQty] = useState<number>(1);

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
			<div className='relative z-10 container mx-auto px-4 pt-6 pb-24'>
				{/* Main heading */}
				<h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-10 leading-relaxed max-w-5xl mx-auto mt-4'>
					{language === "ar"
						? "انقل بضاعتك وحمولتك أينما ترغب بطريقه سهلة وآمنة ."
						: "Transport your goods and cargo wherever you want in an easy and safe way."}
				</h1>

				{/* Order form card (matches provided designs) */}
				<div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-[#e4e4e4] p-4 md:p-6 lg:p-8'>
					{/* Header tabs */}
					<div className='flex items-center justify-between border-b border-gray-100 pb-3 md:pb-4'>
						<div
							className={`flex gap-3 md:gap-4 ${
								language === "ar" ? "flex-row-reverse" : ""
							}`}>
							<button className='text-[#3BA776] font-bold text-lg md:text-xl pb-1 border-b-2 border-[#3BA776]'>
								{language === "ar" ? "أطلب الآن" : "Order Now"}
							</button>
						</div>
					</div>

					{/* Delivery type selection */}
					<div
						className={`flex ${
							language === "ar" ? "justify-end" : "justify-start"
						} gap-6 md:gap-8 mt-4 mb-6`}>
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
					<div className='flex flex-col lg:flex-row gap-3 md:gap-4 items-center'>
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
								<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2'>
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
										<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2'>
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
								<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2'>
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
										<div className='hidden lg:block text-3xl text-[#3BA776] font-bold px-2'>
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

					{/* Secondary row: truck/qty/date/load/insurance */}
					<div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
						{/* Select truck */}
						<button className='h-14 w-full rounded-lg border border-gray-200 bg-[#F5F5F5] text-gray-500 font-medium hover:border-emerald-300 text-center flex items-center justify-center'>
							{language === "ar" ? "اختر الشاحنة" : "Select Truck"}
						</button>

						{/* Quantity */}
						<div className='h-14 w-full rounded-lg border border-gray-200 bg-[#F5F5F5] flex items-center justify-center gap-3'>
							<button
								aria-label='increment'
								onClick={() => setQty((q) => Math.min(q + 1, 99))}
								className='w-9 h-9 rounded-md bg-white border border-emerald-300 text-emerald-600 text-xl leading-none'>
								+
							</button>
							<span className='min-w-8 text-center text-gray-700 font-semibold'>
								{qty}
							</span>
							<button
								aria-label='decrement'
								onClick={() => setQty((q) => Math.max(q - 1, 1))}
								className='w-9 h-9 rounded-md bg-white border border-emerald-300 text-emerald-600 text-xl leading-none'>
								-
							</button>
						</div>

						{/* Date & Time */}
						<button className='h-14 w-full rounded-lg border border-gray-200 bg-[#F5F5F5] text-gray-500 font-medium hover:border-emerald-300 text-center flex items-center justify-center'>
							{language === "ar" ? "تاريخ ووقت" : "Date & Time"}
						</button>

						{/* Load Type */}
						<button className='h-14 w-full rounded-lg border border-gray-200 bg-[#F5F5F5] text-gray-500 font-medium hover:border-emerald-300 text-center flex items-center justify-center'>
							{language === "ar" ? "نوع الحمولة" : "Load Type"}
						</button>

						{/* Insurance */}
						<input
							type='number'
							className='md:col-span-2 h-14 w-full rounded-lg border border-gray-200 bg-[#F5F5F5] px-4 text-right placeholder-gray-500'
							placeholder={
								language === "ar"
									? "أدخل قيمة بضاعتك"
									: "Enter your goods value"
							}
						/>
					</div>

					{/* Get Price button */}
					<div className='mt-5 text-center'>
						<button className='w-full md:w-auto md:px-12 bg-[#3BA776] hover:bg-[#35996B] text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all duration-300 mx-auto block'>
							{language === "ar" ? "احصل على السعر" : "Get Price"}
						</button>
					</div>
				</div>

				{/* App download section */}
				<div className='relative z-20 mt-12 md:mt-16 text-center'>
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
