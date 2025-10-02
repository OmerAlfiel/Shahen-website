"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function Partners() {
	const { t } = useLanguage();
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		let scrollAmount = 0;
		const scroll = () => {
			scrollAmount += 1;
			if (scrollAmount >= scrollContainer.scrollWidth / 2) {
				scrollAmount = 0;
			}
			scrollContainer.scrollLeft = scrollAmount;
		};

		const interval = setInterval(scroll, 30);
		return () => clearInterval(interval);
	}, []);

	const partners = [
		{ name: "Al Kaffary Group", query: "al-kaffary-group-logo" },
		{ name: "AHG", query: "ahg-company-logo" },
		{ name: "Dazuz Sugar", query: "dazuz-sugar-logo" },
		{ name: "HR Resources", query: "human-resources-logo" },
		{ name: "Al Kaffary Group", query: "al-kaffary-group-logo" },
		{ name: "AHG", query: "ahg-company-logo" },
		{ name: "Dazuz Sugar", query: "dazuz-sugar-logo" },
		{ name: "HR Resources", query: "human-resources-logo" },
	];

	return (
		<section className='py-16 md:py-24 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<AnimatedSection animation='fade-in'>
					<h2 className='text-3xl md:text-4xl font-bold text-center text-emerald-600 mb-12'>
						{t("partnersTitle")}
					</h2>
				</AnimatedSection>

				<div className='relative overflow-hidden'>
					<div
						ref={scrollRef}
						className='flex gap-8 overflow-x-hidden'
						style={{ scrollBehavior: "auto" }}>
						{partners.map((partner, index) => (
							<div
								key={index}
								className='flex-shrink-0 w-64 h-32 bg-white rounded-xl shadow-md flex items-center justify-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group cursor-pointer'>
								<img
									src={`/.jpg?height=80&width=200&query=${partner.query}`}
									alt={partner.name}
									className='max-w-[180px] max-h-[60px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300'
								/>
							</div>
						))}
					</div>

					{/* Gradient overlays */}
					<div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none' />
					<div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none' />
				</div>
			</div>
		</section>
	);
}
