import React from "react";
import Hero from "../components/hero";
import TruckTypes from "../components/truck-types";
import Features from "../components/features";
import HowItWorks from "../components/how-it-works";
import OrderProcess from "../components/order-process";
import Partners from "../components/partners";
import { useLanguage } from "../contexts/language-context";

const HomePage: React.FC = () => {
	const { language } = useLanguage();

	return (
		<main
			className='min-h-screen relative'
			dir={language === "ar" ? "rtl" : "ltr"}>
			<Hero />
			<div className='bg-[#F5F5F5] relative z-10'>
				<TruckTypes />
				<Features />
				<HowItWorks />
				<OrderProcess />
				<Partners />
			</div>
		</main>
	);
};

export default HomePage;
