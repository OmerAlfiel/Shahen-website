"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function Footer() {
	const { t } = useLanguage();

	return (
		<footer className='bg-gray-900 text-white'>
			<div className='container mx-auto px-4 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
					{/* Contact */}
					<AnimatedSection animation='fade-in'>
						<div>
							<h3 className='text-xl font-bold mb-4'>{t("address")}</h3>
							<p className='text-gray-400 leading-relaxed'>
								{t("addressDetails")}
							</p>
						</div>
					</AnimatedSection>

					{/* Support */}
					<AnimatedSection animation='fade-in' delay={100}>
						<div>
							<h3 className='text-xl font-bold mb-4'>{t("supportHelp")}</h3>
							<ul className='space-y-2'>
								<li>
									<a
										href='/contact'
										className='text-gray-400 hover:text-emerald-400 transition-colors hover:translate-x-1 inline-block'>
										{t("contactUs")}
									</a>
								</li>
								<li>
									<a
										href='/faq'
										className='text-gray-400 hover:text-emerald-400 transition-colors hover:translate-x-1 inline-block'>
										{t("commonQuestions")}
									</a>
								</li>
							</ul>
						</div>
					</AnimatedSection>

					{/* Legal */}
					<AnimatedSection animation='fade-in' delay={200}>
						<div>
							<h3 className='text-xl font-bold mb-4'>{t("legal")}</h3>
							<ul className='space-y-2'>
								<li>
									<a
										href='/terms'
										className='text-gray-400 hover:text-emerald-400 transition-colors hover:translate-x-1 inline-block'>
										{t("termsOfUse")}
									</a>
								</li>
								<li>
									<a
										href='/privacy'
										className='text-gray-400 hover:text-emerald-400 transition-colors hover:translate-x-1 inline-block'>
										{t("privacyPolicy")}
									</a>
								</li>
								<li>
									<a
										href='/delete-account'
										className='text-gray-400 hover:text-emerald-400 transition-colors hover:translate-x-1 inline-block'>
										{t("deleteAccount")}
									</a>
								</li>
							</ul>
						</div>
					</AnimatedSection>

					{/* About */}
					<AnimatedSection animation='fade-in' delay={300}>
						<div>
							<h3 className='text-xl font-bold mb-4'>{t("aboutUs")}</h3>
							<p className='text-gray-400 leading-relaxed text-sm'>
								{t("aboutDesc")}
							</p>
						</div>
					</AnimatedSection>
				</div>

				{/* Social & Payment */}
				<div className='border-t border-gray-800 pt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-6'>
						{/* Social Media */}
						<div className='flex items-center gap-4'>
							<span className='text-gray-400'>{t("contactMethods")}</span>
							<div className='flex gap-3'>
								<a
									href='https://youtube.com/@shahen'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110 hover:rotate-12'>
									<Youtube className='w-5 h-5' />
								</a>
								<a
									href='https://instagram.com/shahen'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110 hover:rotate-12'>
									<Instagram className='w-5 h-5' />
								</a>
								<a
									href='https://facebook.com/shahen'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110 hover:rotate-12'>
									<Facebook className='w-5 h-5' />
								</a>
								<a
									href='https://twitter.com/shahen'
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110 hover:rotate-12'>
									<svg
										className='w-5 h-5'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
									</svg>
								</a>
							</div>
						</div>

						{/* Payment Methods */}
						<div className='flex items-center gap-3'>
							<div className='w-16 h-10 bg-white rounded flex items-center justify-center hover:scale-110 transition-transform cursor-pointer'>
								<span className='text-xs font-bold text-gray-800'>MADA</span>
							</div>
							<div className='w-16 h-10 bg-white rounded flex items-center justify-center hover:scale-110 transition-transform cursor-pointer'>
								<span className='text-xs font-bold text-blue-600'>VISA</span>
							</div>
							<div className='w-16 h-10 bg-white rounded flex items-center justify-center hover:scale-110 transition-transform cursor-pointer'>
								<div className='flex gap-1'>
									<div className='w-3 h-3 rounded-full bg-red-500' />
									<div className='w-3 h-3 rounded-full bg-orange-500' />
								</div>
							</div>
						</div>
					</div>

					{/* App Download */}
					<div className='flex flex-col items-center mt-8 gap-4'>
						<p className='text-gray-400 text-center max-w-2xl'>
							{t("downloadApp")}
						</p>
						<div className='flex flex-wrap justify-center gap-4'>
							<a
								href='https://play.google.com/store/apps/details?id=com.shahen&gl=SA'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:opacity-80 transition-all hover:scale-105'>
								<div className='bg-black rounded-lg px-6 py-3 flex items-center gap-2'>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
									</svg>
									<div className='text-right'>
										<div className='text-xs'>GET IT ON</div>
										<div className='text-sm font-bold'>Google Play</div>
									</div>
								</div>
							</a>
							<a
								href='https://apps.apple.com/sa/app/shahen-%D8%B4%D8%AD%D9%86/id1568118147'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:opacity-80 transition-all hover:scale-105'>
								<div className='bg-black rounded-lg px-6 py-3 flex items-center gap-2'>
									<svg
										className='w-6 h-6'
										fill='currentColor'
										viewBox='0 0 24 24'>
										<path d='M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z' />
									</svg>
									<div className='text-right'>
										<div className='text-xs'>Download on the</div>
										<div className='text-sm font-bold'>App Store</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className='border-t border-gray-800 mt-8 pt-6 text-center'>
					<p className='text-gray-500 text-sm'>{t("nationalNumber")}</p>
					<p className='text-gray-500 text-sm mt-2'>{t("copyright")}</p>
				</div>
			</div>

			<div className='fixed bottom-6 left-6 z-50 group'>
				<button className='w-16 h-16 bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 animate-bounce hover:animate-none'>
					<svg
						className='w-8 h-8 text-white'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
						/>
					</svg>
				</button>
				<div className='absolute bottom-20 left-0 bg-white rounded-lg shadow-xl p-3 text-sm text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					مرحبا
					<br />
					تحتاج إلى مساعدة ؟
				</div>
			</div>
		</footer>
	);
}
