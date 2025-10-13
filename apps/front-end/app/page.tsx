"use client";

import Hero from "../components/landing/hero";
import TruckTypes from "../components/landing/truck-types";
import Features from "../components/landing/features";
import ServiceTypes from "../components/landing/service-types";
import HowItWorks from "../components/landing/how-it-works";
import OrderProcess from "../components/landing/order-process";
import Partners from "../components/landing/partners";
import { useLanguage } from "../contexts/language-context";

export default function HomePage() {
	const { language } = useLanguage();

	return (
		<main
			className='min-h-screen relative bg-transparent'
			dir={language === "ar" ? "rtl" : "ltr"}>
			<Hero />
			<div className='relative z-10'>
				<ServiceTypes />
				<OrderProcess />
				<TruckTypes />
				<Features />
				<HowItWorks />
				<Partners />
			</div>
		</main>
	);
}
