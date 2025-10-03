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
		<section
			className='py-8 md:py-16 relative overflow-hidden bg-gray-50'
			style={{
				clipPath: "polygon(0 18%, 100% 2%, 100% 100%, 0 100%)",
			}}>
			<div className='relative z-10'>
				{/* App download section */}
				<div className='relative z-20 mt-20 md:mt-28 text-center'>
					<p className='text-black text-lg md:text-xl lg:text-2xl font-medium mb-8 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm rounded-2xl p-6'>
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

				{/* Cards */}
				<div className='container mx-auto px-1 mt-16 md:mt-20'>
					<div className='flex flex-nowrap gap-1 md:gap-6 max-w-6xl mx-auto overflow-x-auto'>
						{items.map((item, idx) => (
							<AnimatedSection key={idx} animation='slide-up' delay={idx * 150}>
								<article className='w-[32vw] md:w-auto md:flex-1 h-[350px] md:h-[700px] bg-white shadow-lg overflow-hidden flex flex-col flex-shrink-0'>
									<div className='w-full overflow-hidden flex justify-center items-center py-1 md:py-6 flex-shrink-0'>
										<img
											src={item.img}
											alt={item.alt}
											className='w-[90%] md:w-[80%] h-16 md:h-36 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer'
											loading='lazy'
										/>
									</div>
									<div
										className='p-1 md:p-6 flex-1 flex flex-col'
										dir={language === "ar" ? "rtl" : "ltr"}>
										<h3 className='text-[10px] md:text-xl font-bold text-gray-800 mb-1 md:mb-4 flex-shrink-0 leading-tight'>
											{item.title}
										</h3>
										<p className='text-gray-600 leading-3 md:leading-8 text-[8px] md:text-base flex-1 overflow-hidden'>
											{item.description}
										</p>
									</div>
								</article>
							</AnimatedSection>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
