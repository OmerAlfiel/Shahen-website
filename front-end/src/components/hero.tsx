import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../contexts/language-context";
import MapboxInput from "./mapbox-input";
import TruckPicker from "./modals/truck-picker";
import DateTimePicker, { DateTimePickerValue } from "./modals/date-time-picker";
import LoadTypePicker, { LoadTypePickerValue } from "./modals/load-type-picker";
import { useQuote } from "../hooks/use-quote";

export default function Hero() {
	const { language } = useLanguage();
	const [deliveryType, setDeliveryType] = useState<"single" | "multiple">(
		"single"
	);
	const [pickupLocation, setPickupLocation] = useState("");
	const [deliveryLocation1, setDeliveryLocation1] = useState("");
	const [deliveryLocation2, setDeliveryLocation2] = useState("");
	const [qty, setQty] = useState<number>(1);

	// Step-by-step states
	const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
	const [truckModalOpen, setTruckModalOpen] = useState(false);
	const [dateModalOpen, setDateModalOpen] = useState(false);
	const [loadModalOpen, setLoadModalOpen] = useState(false);
	const [selectedTruckLabel, setSelectedTruckLabel] = useState<string>("");
	const [selectedDateTime, setSelectedDateTime] =
		useState<DateTimePickerValue | null>(null);
	const [selectedLoadType, setSelectedLoadType] =
		useState<LoadTypePickerValue | null>(null);

	// Optional insurance value input
	const [insuranceValue, setInsuranceValue] = useState<number | undefined>();

	// Quote API hook
	const { getQuote, loading, data, error } = useQuote();

	// Determine if location step is complete
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

	// Auto-advance from step 1 to step 2 when location is set
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
		<div className='relative min-h-[100vh] overflow-hidden pt-16 md:pt-20'>
			{/* Hero Content */}
			<div className='relative min-h-[100vh] overflow-hidden pt-16 md:pt-20 mb-2'>
				{/* Main heading */}
				<h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-10 leading-relaxed max-w-5xl mx-auto mt-4'>
					{language === "ar"
						? "انقل بضاعتك وحمولتك أينما ترغب بطريقه سهلة وآمنة ."
						: "Transport your goods and cargo wherever you want in an easy and safe way."}
				</h1>

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
					<div className='flex flex-col lg:flex-row gap-3 md:gap-4 items-stretch'>
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

					{/* Steps 2-5 content, shown progressively */}
					{step >= 2 && (
						<div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
							{/* Step 2: Select truck (modal) */}
							<button
								disabled={!locationComplete}
								onClick={() => setTruckModalOpen(true)}
								className={`h-14 w-full rounded-lg border text-center flex items-center justify-center ${
									locationComplete
										? "border-gray-200 bg-[#F5F5F5] hover:border-emerald-300 text-gray-700"
										: "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
								}`}>
								{selectedTruckLabel
									? selectedTruckLabel
									: language === "ar"
									? "اختر الشاحنة"
									: "Select Truck"}
							</button>

							{/* Quantity (available after truck selection) */}
							<div
								className={`h-14 w-full rounded-lg border flex items-center justify-center gap-3 ${
									selectedTruckLabel
										? "border-gray-200 bg-[#F5F5F5]"
										: "border-gray-100 bg-gray-50 opacity-60"
								}`}>
								<button
									aria-label='increment'
									onClick={() =>
										selectedTruckLabel && setQty((q) => Math.min(q + 1, 99))
									}
									className='w-9 h-9 rounded-md bg-white border border-emerald-300 text-emerald-600 text-xl leading-none'>
									+
								</button>
								<span className='min-w-8 text-center text-gray-700 font-semibold'>
									{qty}
								</span>
								<button
									aria-label='decrement'
									onClick={() =>
										selectedTruckLabel && setQty((q) => Math.max(q - 1, 1))
									}
									className='w-9 h-9 rounded-md bg-white border border-emerald-300 text-emerald-600 text-xl leading-none'>
									-
								</button>
							</div>

							{/* Step 3: Date & Time (modal) */}
							{step >= 3 && (
								<button
									disabled={!selectedTruckLabel}
									onClick={() => setDateModalOpen(true)}
									className={`h-14 w-full rounded-lg border text-center flex items-center justify-center ${
										selectedTruckLabel
											? "border-gray-200 bg-[#F5F5F5] hover:border-emerald-300 text-gray-700"
											: "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
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
							)}

							{/* Step 4: Load Type (modal) */}
							{step >= 4 && (
								<button
									disabled={!selectedDateTime}
									onClick={() => setLoadModalOpen(true)}
									className={`h-14 w-full rounded-lg border text-center flex items-center justify-center ${
										selectedDateTime
											? "border-gray-200 bg-[#F5F5F5] hover:border-emerald-300 text-gray-700"
											: "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
									}`}>
									{selectedLoadType
										? selectedLoadType.loadType
										: language === "ar"
										? "نوع الحمولة"
										: "Load Type"}
								</button>
							)}

							{/* Step 5: Insurance (enabled after load type) */}
							{step >= 5 && (
								<input
									type='number'
									disabled={!selectedLoadType}
									className={`md:col-span-2 h-14 w-full rounded-lg border px-4 text-right placeholder-gray-500 ${
										selectedLoadType
											? "border-gray-200 bg-[#F5F5F5]"
											: "border-gray-100 bg-gray-50"
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
							)}
						</div>
					)}

					{/* Get Price button */}
					{step >= 5 && (
						<div className='mt-5 text-center'>
							<button
								disabled={!canGetPrice}
								className={`w-full md:w-auto md:px-12 font-bold py-4 rounded-xl text-lg shadow-lg transition-all duration-300 mx-auto block ${
									canGetPrice
										? "bg-[#3BA776] hover:bg-[#35996B] text-white"
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
			</div>
		</div>
	);
}
