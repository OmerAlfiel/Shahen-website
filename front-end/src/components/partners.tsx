"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function Partners() {
	const { language } = useLanguage();
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const partners = [
		{
			name: "Partner 1",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+1",
		},
		{
			name: "Partner 2",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+2",
		},
		{
			name: "Partner 3",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+3",
		},
		{
			name: "Partner 4",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+4",
		},
		{
			name: "Partner 5",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+5",
		},
		{
			name: "Partner 6",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+6",
		},
		{
			name: "Partner 7",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+7",
		},
		{
			name: "Partner 8",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+8",
		},
		{
			name: "Partner 9",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+9",
		},
		{
			name: "Partner 10",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+10",
		},
		{
			name: "Partner 11",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+11",
		},
		{
			name: "Partner 12",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+12",
		},
		{
			name: "Partner 13",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+13",
		},
		{
			name: "Partner 14",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+14",
		},
		{
			name: "Partner 15",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+15",
		},
		{
			name: "Partner 16",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+16",
		},
		{
			name: "Partner 17",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+17",
		},
		{
			name: "Partner 18",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+18",
		},
		{
			name: "Partner 19",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+19",
		},
		{
			name: "Partner 20",
			src: "https://via.placeholder.com/200x100/f0f0f0/666?text=Partner+20",
		},
	];

	// Auto-advance carousel
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 4) % partners.length);
		}, 3000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [partners.length]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 4) % partners.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? partners.length - 4 : prevIndex - 4
		);
	};

	const getVisiblePartners = () => {
		const visible = [];
		for (let i = 0; i < 4; i++) {
			visible.push(partners[(currentIndex + i) % partners.length]);
		}
		return visible;
	};

	return (
		<section className='py-16 md:py-24 bg-white/95 backdrop-blur-sm relative'>
			<div className='container mx-auto px-4'>
				<AnimatedSection animation='fade-in'>
					<div className='text-center mb-12'>
						<h5
							className='text-2xl md:text-3xl font-bold text-emerald-600 mb-4'
							style={{
								fontFamily:
									language === "ar"
										? "NotoKufiArabicRegular, CairoRegular"
										: "inherit",
								padding: "0px 10px 10px",
							}}>
							{language === "ar" ? "الشركاء" : "Partners"}
						</h5>
						<div className='w-24 h-1 bg-emerald-600 mx-auto'></div>
					</div>
				</AnimatedSection>

				{/* Carousel Container */}
				<div className='relative' dir={language === "ar" ? "ltr" : "ltr"}>
					<div className='overflow-hidden'>
						<div className='flex gap-6 transition-transform duration-500 ease-in-out'>
							{getVisiblePartners().map((partner, index) => (
								<div
									key={`${currentIndex}-${index}`}
									className='flex-shrink-0 w-full md:w-1/4'>
									<div className='bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group cursor-pointer'>
										<div className='flex items-center justify-center h-32'>
											<img
												src={partner.src}
												alt={partner.name}
												className='max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300'
												loading='lazy'
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Arrows */}
					<button
						onClick={prevSlide}
						className='absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group border border-white/20'
						aria-label='Previous'>
						<svg
							className='w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
					</button>

					<button
						onClick={nextSlide}
						className='absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group border border-white/20'
						aria-label='Next'>
						<svg
							className='w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</button>
				</div>

				{/* Dots indicator */}
				<div className='flex justify-center mt-8 gap-2'>
					{Array.from({ length: Math.ceil(partners.length / 4) }).map(
						(_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index * 4)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									Math.floor(currentIndex / 4) === index
										? "bg-emerald-600 scale-125"
										: "bg-gray-300 hover:bg-emerald-400"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						)
					)}
				</div>
			</div>
		</section>
	);
}
