"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function Partners() {
	const { language } = useLanguage();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const ITEMS_PER_VIEW = 4;
	const AUTO_ADVANCE_DELAY = 3000;
	const TRANSITION_SPEED = 1;

	const partners = useMemo(
		() => [
			{
				name: "Partner 1",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 2",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 3",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 4",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 5",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 6",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 7",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 8",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 9",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 10",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 11",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 12",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 13",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 14",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 15",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 16",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 17",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 18",
				src: "/Partners/Partner (27).png",
			},
			{
				name: "Partner 19",
				src: "/Partners/Partner (20).png",
			},
			{
				name: "Partner 20",
				src: "/Partners/Partner (27).png",
			},
		],
		[]
	);

	// Start auto-advance timer
	const startAutoAdvance = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		intervalRef.current = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + TRANSITION_SPEED) % partners.length
			);
		}, AUTO_ADVANCE_DELAY);
	}, [partners.length]);

	// Stop auto-advance timer
	const stopAutoAdvance = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	// Auto-advance carousel effect
	useEffect(() => {
		if (!isHovered) {
			startAutoAdvance();
		} else {
			stopAutoAdvance();
		}

		return () => {
			stopAutoAdvance();
		};
	}, [isHovered, startAutoAdvance, stopAutoAdvance]);

	// Handle manual navigation
	const handleManualNavigation = useCallback(
		(newIndex: number) => {
			setCurrentIndex(newIndex);
			// Restart auto-advance timer after manual navigation
			if (!isHovered) {
				startAutoAdvance();
			}
		},
		[isHovered, startAutoAdvance]
	);

	const nextSlide = useCallback(() => {
		const newIndex = (currentIndex + ITEMS_PER_VIEW) % partners.length;
		handleManualNavigation(newIndex);
	}, [currentIndex, partners.length, handleManualNavigation]);

	const prevSlide = useCallback(() => {
		const newIndex =
			currentIndex === 0
				? partners.length - ITEMS_PER_VIEW
				: currentIndex - ITEMS_PER_VIEW;
		handleManualNavigation(newIndex);
	}, [currentIndex, partners.length, handleManualNavigation]);

	const goToSlide = useCallback(
		(slideIndex: number) => {
			const newIndex = slideIndex * ITEMS_PER_VIEW;
			handleManualNavigation(newIndex);
		},
		[handleManualNavigation]
	);

	// Get visible partners for infinite loop
	const getVisiblePartners = useCallback(() => {
		const visible = [];
		for (let i = 0; i < ITEMS_PER_VIEW; i++) {
			visible.push(partners[(currentIndex + i) % partners.length]);
		}
		return visible;
	}, [currentIndex, partners]);

	// Mouse event handlers
	const handleMouseEnter = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsHovered(false);
	}, []);

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
				<div
					className='relative'
					dir={language === "ar" ? "ltr" : "ltr"}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
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
					{Array.from({
						length: Math.ceil(partners.length / ITEMS_PER_VIEW),
					}).map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								Math.floor(currentIndex / ITEMS_PER_VIEW) === index
									? "bg-emerald-600 scale-125"
									: "bg-gray-300 hover:bg-emerald-400"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
