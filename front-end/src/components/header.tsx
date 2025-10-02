import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/language-context";
import { Button } from "./ui/button";

const Header: React.FC = () => {
	const { language, setLanguage, t } = useLanguage();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeLink, setActiveLink] = useState("index");
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				// Scrolling down & past 100px
				setIsVisible(false);
			} else {
				// Scrolling up
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	const navLinks = [
		{ id: "index", label: t("home"), href: "/" },
		{ id: "business", label: t("business"), href: "/#business" },
		{ id: "partners", label: t("serviceProviders"), href: "/#partners" },
		{ id: "about", label: t("about"), href: "/#about" },
		{ id: "contactus", label: t("contact"), href: "/contact" },
	];

	return (
		<div
			className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}>
			<nav className='container mx-auto px-4'>
				<div className='flex items-center justify-between py-3'>
					{/* Logo Section - order-1 in LTR (left), order-3 in RTL (right) */}
					<div
						className={`flex-shrink-0 ${
							language === "ar" ? "order-3" : "order-1"
						}`}>
						<a
							href='/'
							className='flex items-center cursor-pointer'
							onClick={() => setActiveLink("index")}>
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
						</a>
					</div>

					{/* Desktop Navigation - order-2 in both (stays centered) */}
					<div className='hidden lg:flex items-center justify-center flex-1 mx-8 order-2'>
						<ul
							className={`flex items-center gap-8 ${
								language === "ar" ? "flex-row-reverse" : ""
							}`}>
							{navLinks.map((link) => (
								<li key={link.id}>
									<a
										href={link.href}
										onClick={() => setActiveLink(link.id)}
										className={`text-base font-medium transition-colors hover:text-emerald-600 ${
											activeLink === link.id
												? "text-emerald-600"
												: "text-gray-700"
										}`}>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Buttons Section - order-3 in LTR (right), order-1 in RTL (left) */}
					<div
						className={`flex items-center gap-3 ${
							language === "ar" ? "order-1 flex-row-reverse" : "order-3"
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

						<a href='/login' className='hidden md:block'>
							<Button className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all hover:scale-105'>
								{t("login")}
							</Button>
						</a>

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
								<a
									href={link.href}
									onClick={() => {
										setActiveLink(link.id);
										setMobileMenuOpen(false);
									}}
									className={`block px-4 py-2 text-base font-medium transition-colors rounded-lg ${
										activeLink === link.id
											? "bg-emerald-50 text-emerald-600"
											: "text-gray-700 hover:bg-gray-50"
									}`}>
									{link.label}
								</a>
							</li>
						))}
						<li className='pt-2'>
							<a href='/login' className='block'>
								<Button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium'>
									{t("login")}
								</Button>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Header;
