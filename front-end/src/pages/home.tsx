import React from "react";
import Hero from "../components/hero";
import TruckTypes from "../components/truck-types";
import Features from "../components/features";
import ServiceTypes from "../components/service-types";
import HowItWorks from "../components/how-it-works";
import OrderProcess from "../components/order-process";
import Partners from "../components/partners";
import { useLanguage } from "../contexts/language-context";

const HomePage: React.FC = () => {
	const { language } = useLanguage();

	return (
		<main
			className='min-h-screen relative bg-transparent'
			dir={language === "ar" ? "rtl" : "ltr"}>
			<Hero />
			<div className='bg-white/95 backdrop-blur-sm relative z-10 shadow-lg'>
				<ServiceTypes />
				<OrderProcess />
				<TruckTypes />
				<Features />
				<HowItWorks />
				<Partners />
			</div>
		</main>
	);
};

export default HomePage;
