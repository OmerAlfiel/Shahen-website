import React from "react";
import AnimatedSection from "./animated-section";
import { useLanguage } from "../contexts/language-context";

export default function ServiceTypes() {
	const { language, t } = useLanguage();

	const items = [
		{
			title: t("companyShipping"),
			description: t("companyDesc"),
			img: "/delivery-illustration.svg",
			alt: language === "ar" ? "شحن للشركات" : "Company Shipping",
		},
		{
			title: t("serviceProviderShipping"),
			description: t("serviceProviderDesc"),
			img: "/Service-providers.svg",
			alt: language === "ar" ? "مزودي الخدمة" : "Service Providers",
		},
		{
			title: t("individualShipping"),
			description: t("individualDesc"),
			img: "/shipping.svg",
			alt: language === "ar" ? "شحن للأفراد" : "Individual Shipping",
		},
	];

	return (
		<section className='bg-gray-100 py-8 md:py-12 relative'>
			<div className='relative z-10 max-w-7xl mx-auto px-3 md:px-6'>
				{/* Cards */}
				<div
					className='grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3'
					dir={language === "ar" ? "rtl" : "ltr"}>
					{items.map((item, idx) => (
						<AnimatedSection key={idx} animation='slide-up' delay={idx * 150}>
							<article className='group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex flex-col h-full p-4 md:p-6'>
								<div className='flex items-center justify-center mb-4 md:mb-6 h-24 md:h-40 overflow-hidden'>
									<img
										src={item.img}
										alt={item.alt}
										className='max-h-full max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105'
										loading='lazy'
									/>
								</div>
								<h3 className='text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4 leading-snug text-center md:text-start'>
									{item.title}
								</h3>
								<p className='text-sm md:text-base text-gray-600 leading-relaxed md:leading-7 text-center md:text-start flex-1'>
									{item.description}
								</p>
							</article>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
