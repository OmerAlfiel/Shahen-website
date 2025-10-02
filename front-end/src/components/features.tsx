"use client";

import { Package, Headphones, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function Features() {
	const { t } = useLanguage();

	const features = [
		{
			icon: Package,
			title: t("insuranceTitle"),
			description: t("insuranceDesc"),
		},
		{
			icon: Headphones,
			title: t("supportTitle"),
			description: t("supportDesc"),
		},
		{
			icon: MapPin,
			title: t("trackingTitle"),
			description: t("trackingDesc"),
		},
	];

	return (
		<section className='py-16 md:py-24 bg-white'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
					{features.map((feature, index) => (
						<AnimatedSection
							key={index}
							animation='slide-up'
							delay={index * 150}>
							<div className='text-center p-8 rounded-xl hover:bg-gray-50 transition-all duration-500 hover:scale-105 group cursor-pointer'>
								<div className='flex justify-center mb-6'>
									<div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12'>
										<feature.icon className='w-10 h-10 text-emerald-600 group-hover:text-white transition-colors duration-300' />
									</div>
								</div>
								<h3 className='text-xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors'>
									{feature.title}
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									{feature.description}
								</p>
							</div>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
