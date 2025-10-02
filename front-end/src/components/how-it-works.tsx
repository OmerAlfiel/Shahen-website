"use client";

import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function HowItWorks() {
	const { t } = useLanguage();

	return (
		<section className='py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white'>
			<div className='container mx-auto px-4'>
				<AnimatedSection animation='fade-in'>
					<h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16 text-balance'>
						{t("howItWorksTitle")}
					</h2>
				</AnimatedSection>

				<div className='grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto'>
					<AnimatedSection
						animation='slide-in-right'
						className='order-2 md:order-1'>
						<div className='relative'>
							<div className='bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl p-8 md:p-12 hover:shadow-2xl transition-all duration-500 hover:scale-105'>
								<div className='relative'>
									{/* Truck illustration */}
									<div className='w-full aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden group'>
										<img
											src='/delivery-truck-with-driver-illustration.jpg'
											alt='Delivery truck'
											className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
										/>
									</div>
									<div className='absolute -top-4 -right-4 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg animate-bounce'>
										<span className='font-bold'>✓ معتمد</span>
									</div>
								</div>
							</div>
						</div>
					</AnimatedSection>

					{/* Content */}
					<AnimatedSection
						animation='slide-in-left'
						className='order-1 md:order-2'>
						<div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105'>
							<p className='text-lg text-gray-700 leading-relaxed text-balance'>
								{t("howItWorksDesc")}
							</p>
						</div>
					</AnimatedSection>
				</div>
			</div>
		</section>
	);
}
