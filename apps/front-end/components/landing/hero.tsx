"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../contexts/language-context";
import MapboxInput from "../shared/mapbox-input";
import TruckPicker from "../modals/truck-picker";
import DateTimePicker, {
	DateTimePickerValue,
} from "../modals/date-time-picker";
import LoadTypePicker, {
	LoadTypePickerValue,
} from "../modals/load-type-picker";
import { useQuote } from "../../hooks/use-quote";

export default function Hero() {
	const { language } = useLanguage();
	const [deliveryType, setDeliveryType] = useState<"single" | "multiple">(
		"single"
	);
	const [pickupLocation, setPickupLocation] = useState("");
	const [deliveryLocation1, setDeliveryLocation1] = useState("");
	const [deliveryLocation2, setDeliveryLocation2] = useState("");
	const [qty, setQty] = useState<number>(1);
	const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
	const [truckModalOpen, setTruckModalOpen] = useState(false);
	const [dateModalOpen, setDateModalOpen] = useState(false);
	const [loadModalOpen, setLoadModalOpen] = useState(false);
	const [selectedTruckLabel, setSelectedTruckLabel] = useState<string>("");
	const [selectedDateTime, setSelectedDateTime] =
		useState<DateTimePickerValue | null>(null);
	const [selectedLoadType, setSelectedLoadType] =
		useState<LoadTypePickerValue | null>(null);
	const [insuranceValue, setInsuranceValue] = useState<number | undefined>();
	const { getQuote, loading, data, error } = useQuote();
	const locationComplete = useMemo(() => {
		if (deliveryType === "single") {
			return (
				pickupLocation.trim().length > 0 && deliveryLocation1.trim().length > 0
			);
		}
		return (
			pickupLocation.trim().length > 0 &&
			deliveryLocation1.trim().length > 0 &&
			deliveryLocation2.trim().length > 0
		);
	}, [deliveryType, pickupLocation, deliveryLocation1, deliveryLocation2]);

	useEffect(() => {
		if (step === 1 && locationComplete) {
			setStep(2);
		}
	}, [locationComplete, step]);

	const canGetPrice =
		locationComplete &&
		!!selectedTruckLabel &&
		!!selectedDateTime &&
		!!selectedLoadType;

	const handleGetPrice = async () => {
		if (!selectedDateTime || !selectedLoadType) return;
		const payload = {
			deliveryType,
			pickupLocation,
			dropLocation1: deliveryLocation1,
			dropLocation2:
				deliveryType === "multiple" ? deliveryLocation2 : undefined,
			truckLabel: selectedTruckLabel,
			quantity: qty,
			dateISO: selectedDateTime.date.toISOString().slice(0, 10),
			timeLabel: selectedDateTime.time,
			loadType: selectedLoadType.loadType,
			loadQuantity: selectedLoadType.quantity,
			loadExact: selectedLoadType.exact,
			insuranceValue,
			language,
		};

		try {
			await getQuote(payload);
		} catch {
			// handled via state
		}
	};

	return (
		<div className='hero-section'>
			{/* Hero Content (removed redundant min-h to rely on .hero-section adaptive height) */}
			<div className='relative overflow-visible pt-14 sm:pt-16 md:pt-20 mb-2 px-3'>
				{/* Main heading */}
				<h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-4xl sm:max-w-5xl mx-auto mt-2 sm:mt-4 relative z-20 px-2'>
					{language === "ar"
						? "انقل بضاعتك وحمولتك أينما ترغب بطريقه سهلة وآمنة ."
						: "Transport your goods and cargo wherever you want in an easy and safe way."}
				</h1>

				<div className='hero-card-wrapper max-w-5xl sm:max-w-6xl lg:max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-[#e4e4e4] p-3 sm:p-4 md:p-6 lg:p-8'>
					{/* Header tabs */}
					<div className='flex items-center justify-between border-b border-gray-100 pb-2 sm:pb-3 md:pb-4'>
						<div
							className={`flex gap-3 md:gap-4 ${
								language === "ar" ? "flex-row-reverse" : ""
							}`}>
							<button className='text-[#3BA776] font-bold text-base sm:text-lg md:text-xl pb-1 border-b-2 border-[#3BA776]'>
								{language === "ar" ? "أطلب الآن" : "Order Now"}
							</button>
						</div>
					</div>

					{/* Step 1: Delivery type + locations */}
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
					<div className='flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 items-stretch'>
						{language === "ar" ? (
							<>
								{/* Pickup Location - first in RTL */}
								<div
									className={`${
										deliveryType === "multiple" ? "lg:flex-[2]" : "flex-1"
									} w-full min-w-0`}>
									<MapboxInput
										placeholder='موقع التحميل'
										value={pickupLocation}
										onChange={(value) => setPickupLocation(value)}
									/>
								</div>

								{/* Arrow */}
								<div className='hidden lg:flex items-center justify-center text-2xl text-[#3BA776] font-bold px-1 flex-shrink-0'>
									←
								</div>

								{/* Delivery Location 1 */}
								<div
									className={`${
										deliveryType === "multiple" ? "lg:flex-[2]" : "flex-1"
									} w-full min-w-0`}>
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
										<div className='hidden lg:flex items-center justify-center text-2xl text-[#3BA776] font-bold px-1 flex-shrink-0'>
											←
										</div>
										<div className='lg:flex-[2] w-full min-w-0'>
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
								<div
									className={`${
										deliveryType === "multiple" ? "lg:flex-[2]" : "flex-1"
									} w-full min-w-0`}>
									<MapboxInput
										placeholder='Pickup Location'
										value={pickupLocation}
										onChange={(value) => setPickupLocation(value)}
									/>
								</div>

								{/* Arrow */}
								<div className='hidden lg:flex items-center justify-center text-2xl text-[#3BA776] font-bold px-1 flex-shrink-0'>
									→
								</div>

								{/* Delivery Location 1 */}
								<div
									className={`${
										deliveryType === "multiple" ? "lg:flex-[2]" : "flex-1"
									} w-full min-w-0`}>
									<MapboxInput
										placeholder='Delivery Address 1'
										value={deliveryLocation1}
										onChange={(value) => setDeliveryLocation1(value)}
									/>
								</div>

								{/* Second Delivery Location - conditional */}
								{deliveryType === "multiple" && (
									<>
										<div className='hidden lg:flex items-center justify-center text-2xl text-[#3BA776] font-bold px-1 flex-shrink-0'>
											→
										</div>
										<div className='lg:flex-[2] w-full min-w-0'>
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

					{/* Steps row appears ONLY after both (all) locations filled */}
					{locationComplete && (
						<div className='hero-order-row mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3'>
							<div className='order-row-inner w-full flex items-stretch gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap sm:overflow-x-auto'>
								{/* Truck - Always first (available immediately) */}
								<button
									onClick={() => setTruckModalOpen(true)}
									style={{ order: 1 }}
									className='order-field order-field-truck whitespace-nowrap flex-1 min-w-[92px] sm:min-w-[120px] h-11 sm:h-[50px] md:h-[55px] cursor-pointer text-sm sm:text-base'>
									{selectedTruckLabel
										? selectedTruckLabel
										: language === "ar"
										? "اختر الشاحنة"
										: "Select Truck"}
								</button>

								{/* Quantity - Second (unlocked after truck) */}
								<div
									style={{ order: 2 }}
									className={`order-field order-field-qty flex-shrink-0 w-[110px] sm:w-[140px] h-11 sm:h-[50px] md:h-[55px] ${
										selectedTruckLabel ? "" : "disabled"
									}`}>
									<span className='qty-label hidden lg:inline-block text-xs md:text-sm'>
										{language === "ar" ? "عدد الشاحنات" : "Qty"}
									</span>
									<div className='flex items-center gap-1'>
										<button
											aria-label='decrement'
											onClick={() =>
												selectedTruckLabel && setQty((q) => Math.max(q - 1, 1))
											}
											className='qty-btn'>
											-
										</button>
										<span className='qty-value'>{qty}</span>
										<button
											aria-label='increment'
											onClick={() =>
												selectedTruckLabel && setQty((q) => Math.min(q + 1, 99))
											}
											className='qty-btn'>
											+
										</button>
									</div>
								</div>

								{/* Date & Time - Third (unlocked after truck) */}
								<button
									disabled={!selectedTruckLabel}
									onClick={() => setDateModalOpen(true)}
									style={{ order: 3 }}
									className={`order-field order-field-datetime flex-1 min-w-[90px] sm:min-w-[130px] h-11 sm:h-[50px] md:h-[55px] text-sm sm:text-base ${
										selectedTruckLabel ? "cursor-pointer" : "disabled"
									}`}>
									{selectedDateTime
										? language === "ar"
											? `${selectedDateTime.date.toLocaleDateString("ar-SA", {
													weekday: "long",
													month: "long",
													day: "numeric",
											  })} ${selectedDateTime.time
													.replace("AM", "ص")
													.replace("PM", "م")}`
											: `${selectedDateTime.date.toLocaleDateString(undefined, {
													weekday: "short",
													month: "short",
													day: "numeric",
											  })} ${selectedDateTime.time}`
										: language === "ar"
										? "تاريخ ووقت"
										: "Date & Time"}
								</button>

								{/* Load Type - Fourth (unlocked after date) */}
								<button
									disabled={!selectedDateTime}
									onClick={() => setLoadModalOpen(true)}
									style={{ order: 4 }}
									className={`order-field order-field-load flex-1 min-w-[90px] sm:min-w-[120px] h-11 sm:h-[50px] md:h-[55px] text-sm sm:text-base ${
										selectedDateTime ? "cursor-pointer" : "disabled"
									}`}>
									{selectedLoadType
										? selectedLoadType.loadType
										: language === "ar"
										? "نوع الحمولة"
										: "Load Type"}
								</button>

								{/* Insurance - Fifth (unlocked after load type) */}
								<input
									type='number'
									disabled={!selectedLoadType}
									style={{ order: 5 }}
									className={`order-field order-field-insurance text-sm sm:text-base ${
										language === "ar" ? "text-right" : "text-left"
									} placeholder-gray-500 flex-1 min-w-[90px] sm:min-w-[130px] h-11 sm:h-[50px] md:h-[55px] ${
										selectedLoadType ? "" : "disabled"
									}`}
									placeholder={
										language === "ar"
											? "أدخل قيمة بضاعتك"
											: "Enter your goods value"
									}
									value={insuranceValue ?? ""}
									onChange={(e) => {
										const v = e.target.value;
										if (v === "") return setInsuranceValue(undefined);
										const n = Number(v);
										if (!isNaN(n)) setInsuranceValue(n);
									}}
								/>
							</div>

							{/* Get Price Button */}
							<div className='mt-3 sm:mt-4 w-full flex justify-center'>
								<button
									disabled={!canGetPrice}
									className={`get-price-btn-main w-full md:w-auto md:min-w-[220px] font-bold h-12 sm:h-[60px] px-6 sm:px-10 rounded-lg text-base sm:text-lg shadow-md transition-colors duration-300 ${
										canGetPrice
											? "bg-[#018545] hover:bg-[#01763C] text-white"
											: "bg-gray-300 text-white cursor-not-allowed"
									}`}
									onClick={handleGetPrice}>
									{loading
										? language === "ar"
											? "جاري الحساب..."
											: "Calculating..."
										: language === "ar"
										? "احصل على السعر"
										: "Get Price"}
								</button>
							</div>
						</div>
					)}

					{/* Modals */}
					<TruckPicker
						open={truckModalOpen}
						onOpenChange={(open) => {
							setTruckModalOpen(open);
						}}
						onSelect={(truck) => {
							const label = language === "ar" ? truck.nameAr : truck.nameEn;
							setSelectedTruckLabel(label);
							setTruckModalOpen(false);
							setStep(3);
							// Optionally auto-open next step modal for smoother flow
							setTimeout(() => setDateModalOpen(true), 0);
						}}
					/>

					<DateTimePicker
						open={dateModalOpen}
						onOpenChange={(open) => setDateModalOpen(open)}
						onSelect={(value) => {
							setSelectedDateTime(value);
							setStep(4);
							// Optionally auto-open next step modal
							setTimeout(() => setLoadModalOpen(true), 0);
						}}
					/>

					<LoadTypePicker
						open={loadModalOpen}
						onOpenChange={(open) => setLoadModalOpen(open)}
						onSelect={(value) => {
							setSelectedLoadType(value);
							setStep(5);
						}}
					/>

					{/* Quote result preview */}
					{data?.status === "success" && data.data && (
						<div className='mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg'>
							<p className='font-semibold text-emerald-700'>
								{language === "ar" ? "التقدير:" : "Estimate:"}{" "}
								{data.data.estimate} {data.data.currency}
							</p>
						</div>
					)}

					{error && (
						<div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'>
							{language === "ar"
								? "فشل حساب السعر"
								: "Failed to calculate price"}
						</div>
					)}
				</div>

				{/* Download / partnership area within hero diagonal 
				<div className='hero-download-area compact-mobile'>
					<p>
						{language === "ar"
							? "نسعى لتحقيق شراكة متميزة عبر تسخير كل الإمكانات لخدمة عملائنا."
							: "We strive to achieve a distinguished partnership by harnessing all capabilities to serve our customers."}
					</p>
					<div className='hero-download-badges flex justify-center gap-6 sm:gap-8 flex-wrap mt-8 sm:mt-11'>
						<a
							href='https://play.google.com/store/apps/details?id=com.logistics&gl=SA'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block'>
							<img
								src='/google-play-badge.png'
								alt={
									language === "ar"
										? "احصل عليه من Google Play"
										: "Get it on Google Play"
								}
							/>
						</a>
						<a
							href='https://apps.apple.com/sa/app/logistics/id1568118147'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block'>
							<img
								src='/app-store-badge.png'
								alt={
									language === "ar"
										? "حمله من App Store"
										: "Download on the App Store"
								}
							/>
						</a>
					</div>
				</div>*/}
			</div>
		</div>
	);
}
