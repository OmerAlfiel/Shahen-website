"use client";

import { useLanguage } from "../contexts/language-context";

export default function HowItWorks() {
	const { language, t } = useLanguage();

	return (
		<section className='py-16 md:py-24 bg-gray-50 relative'>
			<div className='container mx-auto px-4'>
				{/* Title */}
				<h2
					className='text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800'
					style={{
						fontFamily:
							language === "ar"
								? "NotoKufiArabicRegular, CairoRegular"
								: "inherit",
						direction: language === "ar" ? "rtl" : "ltr",
					}}>
					{t("howItWorksTitle")}
				</h2>

				{/* Content */}
				<div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
					{/* Image */}
					<div className='flex-1 min-w-0'>
						<img
							src='/delivery-truck-with-driver-illustration.png'
							alt='Truck shipping products'
							className='w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
						/>
					</div>

					{/* Text */}
					<div className='flex-1 min-w-0'>
						<p
							className='text-lg leading-relaxed text-gray-600'
							style={{
								fontFamily:
									language === "ar"
										? "NotoKufiArabicRegular, CairoRegular"
										: "inherit",
								direction: language === "ar" ? "rtl" : "ltr",
								textAlign: language === "ar" ? "right" : "left",
							}}>
							{t("howItWorksDesc")}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
