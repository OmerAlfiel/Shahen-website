"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "../ui/button";

const Header: React.FC = () => {
	const { language, setLanguage, t } = useLanguage();
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const getActiveLink = () => {
		// Handle specific routes
		if (pathname === "/contact") return "contactus";
		if (pathname === "/login") return "login";
		if (pathname === "/dashboard") return "dashboard";
		if (pathname === "/tracking") return "tracking";

		// Handle home page sections with hash (client-side)
		if (pathname === "/" || pathname === "") {
			if (typeof window !== "undefined") {
				const hash = window.location.hash;
				if (hash === "#about") return "about";
				if (hash === "#partners") return "partners";
				if (hash === "#business") return "business";
			}
			return "index";
		}

		return "index";
	};

	const activeLink = getActiveLink();

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	useEffect(() => {
		// This effect will trigger when pathname changes
	}, [pathname]);

	const navLinks = [
		{ id: "contactus", label: t("contact"), href: "/contact" },
		{ id: "about", label: t("about"), href: "/#about" },
		{ id: "partners", label: t("serviceProviders"), href: "/#partners" },
		{ id: "business", label: t("business"), href: "/#business" },
		{ id: "index", label: t("home"), href: "/" },
	];

	return (
		<div
			className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md transition-transform duration-300 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}>
			<nav className='container mx-auto px-4'>
				<div
					className={`flex items-center justify-between py-3 ${
						language === "ar" ? "flex-row-reverse" : "flex-row"
					}`}>
					{/* Buttons Section */}
					<div
						className={`flex items-center ${
							language === "ar"
								? "flex-row-reverse gap-3 space-x-reverse"
								: "gap-3"
						}`}>
						{/* Language Switcher */}
						<div
							className={`flex items-center bg-gray-100 rounded-lg overflow-hidden border border-emerald-600 ${
								language === "ar" ? "flex-row-reverse" : ""
							}`}>
							<button
								onClick={() => setLanguage("en")}
								className={`px-3 py-1.5 text-sm font-medium transition-colors ${
									language === "en"
										? "bg-emerald-600 text-white"
										: "text-emerald-600 hover:bg-emerald-50"
								}`}>
								EN
							</button>
							<button
								onClick={() => setLanguage("ar")}
								className={`px-3 py-1.5 text-sm font-medium transition-colors ${
									language === "ar"
										? "bg-emerald-600 text-white"
										: "text-emerald-600 hover:bg-emerald-50"
								}`}>
								AR
							</button>
						</div>

						<Link href='/login' className='hidden md:block'>
							<Button className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all hover:scale-105'>
								{t("login")}
							</Button>
						</Link>

						{/* Mobile Menu Toggle */}
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors'
							aria-label='Toggle menu'>
							{mobileMenuOpen ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<line x1='18' y1='6' x2='6' y2='18'></line>
									<line x1='6' y1='6' x2='18' y2='18'></line>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<line x1='3' y1='12' x2='21' y2='12'></line>
									<line x1='3' y1='6' x2='21' y2='6'></line>
									<line x1='3' y1='18' x2='21' y2='18'></line>
								</svg>
							)}
						</button>
					</div>
					{/* Desktop Navigation */}
					<div className='hidden lg:flex items-center justify-center flex-1 mx-8'>
						<ul
							className={`flex items-center gap-8 ${
								language === "ar" ? "flex-row-reverse" : ""
							}`}>
							{navLinks.map((link) => (
								<li key={link.id}>
									<Link
										href={link.href}
										className={`text-base font-medium transition-colors hover:text-emerald-600 ${
											activeLink === link.id
												? "text-emerald-600"
												: "text-gray-700"
										}`}>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					{/* Logo Section */}
					<div className='flex-shrink-0'>
						<Link href='/' className='flex items-center cursor-pointer'>
							{language === "ar" ? (
								<img
									src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shahenLogoUrdu-XV3pQbfUgCssBVI00Jfa7org5FbYHk.svg'
									alt='Shahen Logo'
									className='h-10 w-auto'
								/>
							) : (
								<img
									src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shahen-logo-Xc4HHjimnrigekeA868rIKYRlyheij.svg'
									alt='Shahen Logo'
									className='h-10 w-auto'
								/>
							)}
						</Link>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
					}`}>
					<ul
						className={`py-4 space-y-2 border-t border-gray-200 ${
							language === "ar" ? "text-right" : "text-left"
						}`}>
						{navLinks.map((link) => (
							<li key={link.id}>
								<Link
									href={link.href}
									onClick={() => {
										setMobileMenuOpen(false);
									}}
									className={`block px-4 py-2 text-base font-medium transition-colors rounded-lg ${
										activeLink === link.id
											? "bg-emerald-50 text-emerald-600"
											: "text-gray-700 hover:bg-gray-50"
									}`}>
									{link.label}
								</Link>
							</li>
						))}
						<li className='pt-2'>
							<Link href='/login' className='block'>
								<Button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium'>
									{t("login")}
								</Button>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Header;
