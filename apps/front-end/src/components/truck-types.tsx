import { useState, useRef } from "react";
import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function TruckTypes() {
	const { language } = useLanguage();
	const isRTL = language === "ar";
	const [activeCategory, setActiveCategory] = useState("Traila");
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Unified scroll handlers that respect RTL direction
	const scrollPrev = () => {
		if (!scrollContainerRef.current) return;
		// In RTL, visually previous is to the right, so positive scroll moves content right (negative logical direction varies by browser but scrollBy handles offset)
		scrollContainerRef.current.scrollBy({
			left: isRTL ? 200 : -200,
			behavior: "smooth",
		});
	};

	const scrollNext = () => {
		if (!scrollContainerRef.current) return;
		// In RTL, next is to the left
		scrollContainerRef.current.scrollBy({
			left: isRTL ? -200 : 200,
			behavior: "smooth",
		});
	};

	const truckCategories = [
		{
			id: "Traila",
			name: "تریلا",
			nameEn: "Traila",
			image: "/images/trucks/traila.png",
		},
		{
			id: "Six",
			name: "سقس",
			nameEn: "Six",
			image: "/images/trucks/traila.png",
		},
		{
			id: "Lorry",
			name: "لوري",
			nameEn: "Lorry",
			image: "/images/trucks/traila.png",
		},
		{
			id: "Diana",
			name: "دینا",
			nameEn: "Diana",
			image: "/images/trucks/traila.png",
		},
	];

	const truckTypes = {
		Traila: [
			{
				name: "تریلا ثلاجة مبرد (20 طن)",
				nameEn: "Refrigerated Trailer (20 tons)",
				size: "الحجم یصل إلى 13.5 متر",
				sizeEn: "Size up to 13.5 meters",
				image: "/images/truckTypes/Trailla/sides.png",
			},
			{
				name: "تریلا جوانب (20 طن)",
				nameEn: "Side Trailer (20 tons)",
				size: "الحجم یصل إلى 13.5 متر",
				sizeEn: "Size up to 13.5 meters",
				image: "/images/truckTypes/Trailla/sides.png",
			},
			{
				name: "تریلا جوانب ألماني ( 25 طن)",
				nameEn: "German Side Trailer (25 tons)",
				size: "الحجم یصل إلى 13.5 متر",
				sizeEn: "Size up to 13.5 meters",
				image: "/images/truckTypes/Trailla/sides.png",
			},
			{
				name: "تریلا ستارة (25 طن)",
				nameEn: "Curtain Trailer (25 tons)",
				size: "الحجم یصل إلى 13.5 متر",
				sizeEn: "Size up to 13.5 meters",
				image: "/images/truckTypes/Trailla/sides.png",
			},
			{
				name: "تریلا سطحة (25 طن)",
				nameEn: "Flatbed Trailer (25 tons)",
				size: "الحجم یصل إلى 13.5 متر",
				sizeEn: "Size up to 13.5 meters",
				image: "/images/truckTypes/Trailla/sides.png",
			},
			{
				name: "تریلا ثلاجة مجمد (20 طن)",
				nameEn: "Frozen Trailer (20 tons)",
				size: "الحجم یصل إلى 13.5 متر",
				sizeEn: "Size up to 13.5 meters",
				image: "/images/truckTypes/Trailla/sides.png",
			},
		],
		Six: [
			{
				name: "سقس جوانب ( 13 طن)",
				nameEn: "Six Side (13 tons)",
				size: "الحجم یصل إلى 7 متر",
				sizeEn: "Size up to 7 meters",
				image: "/images/truckTypes/Six/sides.png",
			},
			{
				name: "سقس ثلاجة مبرد ( 13 طن)",
				nameEn: "Six Refrigerated (13 tons)",
				size: "الحجم یصل إلى 7 متر",
				sizeEn: "Size up to 7 meters",
				image: "/images/truckTypes/Six/sides.png",
			},
		],
		Lorry: [
			{
				name: "لوري ثلاجة مبرد ( 8 طن)",
				nameEn: "Lorry Refrigerated (8 tons)",
				size: "الحجم یصل إلى 6.5 متر",
				sizeEn: "Size up to 6.5 meters",
				image: "/images/truckTypes/Lorry/refrigerator.png",
			},
			{
				name: "لوري جوانب (8 طن)",
				nameEn: "Lorry Side (8 tons)",
				size: "الحجم یصل إلى 6.5 متر",
				sizeEn: "Size up to 6.5 meters",
				image: "/images/truckTypes/Lorry/refrigerator.png",
			},
			{
				name: "لوري مجمد (8 طن)",
				nameEn: "Lorry Frozen (8 tons)",
				size: "الحجم یصل إلى 6.25 متر",
				sizeEn: "Size up to 6.25 meters",
				image: "/images/truckTypes/Lorry/refrigerator.png",
			},
			{
				name: "لوري صندوق مغلق (8 طن)",
				nameEn: "Lorry Closed Box (8 tons)",
				size: "الحجم یصل إلى 6.5 متر",
				sizeEn: "Size up to 6.5 meters",
				image: "/images/truckTypes/Lorry/refrigerator.png",
			},
			{
				name: "لوري بونش (5 طن)",
				nameEn: "Lorry Crane (5 tons)",
				size: "الحجم یصل إلى 6.5 متر",
				sizeEn: "Size up to 6.5 meters",
				image: "/images/truckTypes/Lorry/refrigerator.png",
			},
			{
				name: "لوري بونش (7 طن)",
				nameEn: "Lorry Crane (7 tons)",
				size: "الحجم یصل إلى 6.5 متر",
				sizeEn: "Size up to 6.5 meters",
				image: "/images/truckTypes/Lorry/refrigerator.png",
			},
		],
		Diana: [
			{
				name: "دینا ثلاجة مبرد ( 4 طن)",
				nameEn: "Diana Refrigerated (4 tons)",
				size: "الحجم یصل إلى 4.5 متر",
				sizeEn: "Size up to 4.5 meters",
				image: "/images/truckTypes/Diana/refrigerator.png",
			},
			{
				name: "دینا بونش (3.5 طن)",
				nameEn: "Diana Crane (3.5 tons)",
				size: "الحجم یصل إلى 4.5 متر",
				sizeEn: "Size up to 4.5 meters",
				image: "/images/truckTypes/Diana/refrigerator.png",
			},
			{
				name: "دینا مجمد (4 طن)",
				nameEn: "Diana Frozen (4 tons)",
				size: "الحجم یصل إلى 4.5 متر",
				sizeEn: "Size up to 4.5 meters",
				image: "/images/truckTypes/Diana/refrigerator.png",
			},
			{
				name: "دینا صندوق مغلق (4 طن)",
				nameEn: "Diana Closed Box (4 tons)",
				size: "الحجم یصل إلى 4.5 متر",
				sizeEn: "Size up to 4.5 meters",
				image: "/images/truckTypes/Diana/refrigerator.png",
			},
			{
				name: "دینا جوانب (4 طن)",
				nameEn: "Diana Side (4 tons)",
				size: "الحجم یصل إلى 4.5 متر",
				sizeEn: "Size up to 4.5 meters",
				image: "/images/truckTypes/Diana/refrigerator.png",
			},
		],
	};

	const currentTrucks =
		truckTypes[activeCategory as keyof typeof truckTypes] || [];

	return (
		<section className='py-8 md:py-16' style={{ backgroundColor: "#F4F7FF" }}>
			<div className='container mx-auto px-4 max-w-6xl'>
				{/* Header Text */}
				<div className='text-center mb-8 md:mb-12'>
					<h4
						className='text-base md:text-xl font-semibold text-gray-800 leading-relaxed max-w-5xl mx-auto px-4'
						dir={language === "ar" ? "rtl" : "ltr"}>
						{language === "ar"
							? "لحرصنا على خدمة عملائنا في جميع القطاعات وفرنا العديد من أحجام شاحنات نقل البضائع بدايةً من الشاحنات الصغيرة مثل البيك آب والمتوسطة مثل الدينا وصولا للشاحنات الكبيرة كالتريلا واللوري بأنواعها بالإضافة إلى ذلك حرصنا على توفير جميع أنواع الشاحنات مثل الثلاجات والمغلقة الجاف أو جوانب وغيرها من الأنواع وحسب ما يتناسب مع منتجات كل عميل."
							: "We are committed to serving our customers in all sectors by providing various sizes of freight trucks, from small trucks like pickups and medium ones like Dyna to large trucks like trailers and lorries of all types. In addition, we ensure the availability of all types of trucks such as refrigerated, closed dry, or side trucks and others according to what suits each customer's products."}
					</h4>
				</div>

				<AnimatedSection animation='fade-in'>
					{/* Mobile and Desktop Tab Navigation */}
					<div className='flex justify-center mb-0'>
						<div
							className='relative flex justify-center w-full max-w-4xl'
							style={{ paddingTop: "40px" }}>
							{/* Navigation Container */}
							<div className='relative w-full flex items-center justify-center'>
								{/* Previous Button (mobile) - position swaps in RTL */}
								<button
									onClick={scrollPrev}
									className={`absolute z-40 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors md:hidden ${
										isRTL ? "right-0" : "left-0"
									}`}
									style={{ transform: "translateY(-50%)", top: "50%" }}
									aria-label={isRTL ? "السابق" : "Previous"}>
									<svg
										className='w-4 h-4 text-gray-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											// Chevron left in LTR, chevron right in RTL
											d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
										/>
									</svg>
								</button>

								{/* Scrollable Tab Container */}
								<div
									ref={scrollContainerRef}
									className='flex overflow-x-auto scrollbar-hide gap-0 mx-8 md:mx-0 md:overflow-visible'
									style={{
										scrollbarWidth: "none",
										msOverflowStyle: "none",
									}}>
									{truckCategories.map((category, index) => (
										<button
											key={category.id}
											onClick={() => setActiveCategory(category.id)}
											className={`relative flex-shrink-0 bg-white border border-gray-300 px-4 py-4 md:px-6 md:py-6 min-w-[90px] md:min-w-[120px] transition-all duration-300 ${
												activeCategory === category.id
													? "bg-white border-gray-400 z-30 shadow-lg"
													: "bg-gray-100 border-gray-300 z-10 hover:bg-gray-50"
											}`}
											style={{
												borderTopLeftRadius: index === 0 ? "12px" : "0",
												borderTopRightRadius:
													index === truckCategories.length - 1 ? "12px" : "0",
												borderBottomLeftRadius: "0",
												borderBottomRightRadius: "0",
												borderBottom:
													activeCategory === category.id
														? "1px solid white"
														: "1px solid #d1d5db",
												marginLeft: index > 0 ? "-1px" : "0",
												transform:
													activeCategory === category.id
														? "translateY(-2px)"
														: "translateY(0)",
											}}>
											<div className='flex flex-col items-center'>
												<img
													src={category.image}
													alt={
														language === "ar" ? category.name : category.nameEn
													}
													className='w-10 h-10 md:w-12 md:h-12 object-contain mb-2'
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.src = "/placeholder.svg";
													}}
												/>
												<h3 className='text-xs md:text-sm font-bold text-gray-800 text-center leading-tight whitespace-nowrap'>
													{language === "ar" ? category.name : category.nameEn}
												</h3>
											</div>
										</button>
									))}
								</div>

								{/* Next Button (mobile) - position swaps in RTL */}
								<button
									onClick={scrollNext}
									className={`absolute z-40 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors md:hidden ${
										isRTL ? "left-0" : "right-0"
									}`}
									style={{ transform: "translateY(-50%)", top: "50%" }}
									aria-label={isRTL ? "التالي" : "Next"}>
									<svg
										className='w-4 h-4 text-gray-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											// Chevron right in LTR, chevron left in RTL
											d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					{/* Content Area */}
					<div
						className='bg-white border border-gray-300 rounded-b-xl shadow-lg p-4 md:p-6 max-w-4xl mx-auto'
						style={{
							borderTop: "none",
							marginTop: "-1px",
						}}>
						<div className='space-y-0'>
							{currentTrucks.map((truck, index) => (
								<div
									key={index}
									className='flex flex-row items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200'
									dir={language === "ar" ? "rtl" : "ltr"}>
									<div className='w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-50 rounded-lg p-2'>
										<img
											src={truck.image}
											alt={language === "ar" ? truck.name : truck.nameEn}
											className='w-full h-full object-contain'
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src = "/placeholder.svg";
											}}
										/>
									</div>
									<div className='flex-1 min-w-0'>
										<h4 className='text-sm md:text-lg font-bold text-gray-800 mb-1 leading-tight'>
											{language === "ar" ? truck.name : truck.nameEn}
										</h4>
										<p className='text-gray-600 text-xs md:text-base'>
											{language === "ar" ? truck.size : truck.sizeEn}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
}
