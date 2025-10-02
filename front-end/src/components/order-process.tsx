"use client";

import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function OrderProcess() {
	const { t } = useLanguage();

	const steps = [
		t("step1"),
		t("step2"),
		t("step3"),
		t("step4"),
		t("step5"),
		t("step6"),
	];

	return (
		<section className='py-16 md:py-24 bg-white'>
			<div className='container mx-auto px-4'>
				<AnimatedSection animation='fade-in'>
					<h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16'>
						{t("howToOrder")}
					</h2>
				</AnimatedSection>

				<div className='grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto'>
					<div className='space-y-6'>
						{steps.map((step, index) => (
							<AnimatedSection
								key={index}
								animation='slide-in-right'
								delay={index * 100}>
								<div className='flex items-start gap-4 group'>
									<div className='flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 group-hover:bg-emerald-700 group-hover:rotate-12 transition-all duration-300'>
										{index + 1}
									</div>
									<div className='flex-1 bg-gray-50 rounded-lg p-4 hover:bg-emerald-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer'>
										<p className='text-gray-800 font-medium'>{step}</p>
									</div>
								</div>
							</AnimatedSection>
						))}
					</div>

					<AnimatedSection
						animation='slide-in-left'
						className='flex justify-center'>
						<div className='relative hover:scale-105 transition-transform duration-500'>
							<div className='w-72 h-[600px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl'>
								{/* Phone notch */}
								<div className='absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10' />

								<div className='w-full h-full bg-white rounded-[2.5rem] overflow-hidden'>
									{/* Phone screen content */}
									<div className='relative h-full bg-gradient-to-b from-gray-50 to-white p-6'>
										<div className='text-center mb-6 pt-4'>
											<h3 className='text-xl font-bold text-gray-800'>
												{t("home")}
											</h3>
										</div>

										{/* Map preview */}
										<div className='bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-6 mb-4 relative overflow-hidden group'>
											<div className='absolute inset-0 opacity-20'>
												<div className='absolute top-4 right-4 w-3 h-3 bg-emerald-600 rounded-full animate-pulse' />
												<div className='absolute bottom-6 left-6 w-2 h-2 bg-red-500 rounded-full animate-bounce' />
											</div>
											<p className='text-sm mb-4 font-medium text-gray-700 relative z-10'>
												{t("pickupLocation")}
											</p>
											<div className='bg-white/80 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600 relative z-10 shadow-sm group-hover:shadow-md transition-shadow'>
												{t("map")}
											</div>
										</div>

										<div className='space-y-3'>
											<div className='bg-gray-100 rounded-lg p-4 text-sm text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer'>
												حجم الشاحنة
											</div>
											<div className='bg-gray-100 rounded-lg p-4 text-sm text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer'>
												قيمة التأمين
											</div>
										</div>

										<button className='w-full mt-6 bg-emerald-600 text-white rounded-lg py-4 font-medium shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all hover:scale-105'>
											{t("continueOrder")}
										</button>
									</div>
								</div>
							</div>
						</div>
					</AnimatedSection>
				</div>

				<AnimatedSection animation='fade-in' delay={600}>
					<div className='max-w-4xl mx-auto mt-16 text-center'>
						<p className='text-lg text-gray-700 leading-relaxed text-balance'>
							{t("truckTypesIntro")}
						</p>
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
}
