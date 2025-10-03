import React, { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useContact } from "../hooks/use-contact";
import { ContactFormData } from "../services/contact-api";

const ContactPage: React.FC = () => {
	const { language, t } = useLanguage();
	const { submitForm, loading, error, isSuccess, successMessage } =
		useContact();

	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		phone: "",
		company: "",
		message: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await submitForm(formData);

			// Success is handled by the hook, just reset form
			setFormData({
				name: "",
				phone: "",
				company: "",
				message: "",
			});
		} catch (error) {
			// Error is handled by the hook, no need to show additional alert
			console.error("Contact form submission failed:", error);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative h-[325px] md:h-[425px] overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0'>
					<img
						src='/images/contactUs.png'
						alt={
							language === "ar"
								? "تواصلوا مع شحن واحجزوا شاحنة عبر الإنترنت الآن"
								: "Contact Shahen and book a truck online now"
						}
						className='w-full h-full object-cover'
					/>
					{/* Green overlay to match original */}
					<div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-300/30'></div>
				</div>

				{/* Hero Content */}
				<div className='relative z-10 h-full flex items-center justify-center text-center px-4'>
					<div
						className='max-w-4xl mx-auto'
						dir={language === "ar" ? "rtl" : "ltr"}>
						<h1
							className={`text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight`}>
							{t("contactHeroTitle")}
						</h1>
						<p
							className={`text-lg md:text-xl text-gray-700 mb-3 leading-relaxed`}>
							{t("contactHeroSubtitle")}
						</p>
						<p className={`text-base md:text-lg text-gray-600 leading-relaxed`}>
							{t("contactHeroDescription")}
						</p>
					</div>
				</div>
			</section>

			{/* Contact Section - Modified to match the image layout */}
			<section className='py-8 md:py-16 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='max-w-7xl mx-auto flex justify-center'>
						{/* Main Container for Contact Info and Form, mimicking the single rounded box with a split */}
						<div
							className={`grid md:grid-cols-2 items-stretch rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full border border-gray-100`}
							dir={language === "ar" ? "rtl" : "ltr"}>
							{/* Contact Form - Left side in Arabic (Order 2), with light gray background */}
							<div
								className={`${
									language === "ar" ? "order-2" : "order-1"
								} p-8 bg-gray-50`}>
								<h2
									className={`text-2xl font-bold text-gray-900 mb-8 text-center`}>
									{t("contactFormTitle")} {/* This will be "للتواصل" */}
								</h2>

								<form onSubmit={handleSubmit} className='space-y-6'>
									{/* Success Message */}
									{isSuccess && successMessage && (
										<div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center'>
											<div className='flex items-center justify-center mb-2'>
												<svg
													className='w-8 h-8 text-green-600'
													fill='currentColor'
													viewBox='0 0 20 20'>
													<path
														fillRule='evenodd'
														d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
														clipRule='evenodd'
													/>
												</svg>
											</div>
											<p className='font-bold'>
												{language === "ar"
													? "شكراً لإختيارك منصة شحن"
													: "Thank you for choosing Shahen platform"}
											</p>
											<p>
												{language === "ar"
													? "سيتم التواصل معكم في اقرب وقت"
													: "We will contact you soon"}
											</p>
										</div>
									)}

									{/* Error Message */}
									{error && (
										<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center'>
											{error.message}
										</div>
									)}

									{/* Name */}
									<div>
										<label
											htmlFor='name'
											className={`block text-sm font-medium text-gray-700 mb-2 text-right`}>
											{t("contactName")} {/* الاسم */}
										</label>
										<Input
											id='name'
											name='name'
											type='text'
											required
											value={formData.name}
											onChange={handleChange}
											className={`w-full h-12 border border-gray-300 rounded px-3 py-2 text-right`}
											dir='rtl'
										/>
									</div>

									{/* Phone */}
									<div>
										<label
											htmlFor='phone'
											className={`block text-sm font-medium text-gray-700 mb-2 text-right`}>
											{t("contactPhone")} {/* رقم الجوال */}
										</label>
										<Input
											id='phone'
											name='phone'
											type='tel'
											required
											value={formData.phone}
											onChange={handleChange}
											className={`w-full h-12 border border-gray-300 rounded px-3 py-2 text-right`}
											dir='rtl'
										/>
									</div>

									{/* Company (Optional, single line) - Changed from Textarea to Input */}
									<div>
										<label
											htmlFor='company'
											className={`block text-sm font-medium text-gray-700 mb-2 text-right`}>
											{t("contactCompany")} {/* اسم الشركة (اختیاري) */}
										</label>
										<Input
											id='company'
											name='company'
											type='text'
											value={formData.company}
											onChange={handleChange}
											className={`w-full h-12 border border-gray-300 rounded px-3 py-2 text-right`}
											dir='rtl'
										/>
									</div>

									{/* Message */}
									<div>
										<label
											htmlFor='message'
											className={`block text-sm font-medium text-gray-700 mb-2 text-right`}>
											{t("contactMessage")} {/* التعلیق */}
										</label>
										<Textarea
											id='message'
											name='message'
											rows={4} // Default rows 4 for multi-line comment
											value={formData.message}
											onChange={handleChange}
											className={`w-full border border-gray-300 rounded px-3 py-2 resize-none text-right`}
											dir='rtl'
										/>
									</div>

									<div className='text-center pt-4'>
										<Button
											type='submit'
											disabled={loading}
											className='bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-lg font-medium text-lg min-w-[150px]'>
											{loading ? t("sending") : t("contactSubmit")}{" "}
											{/* تواصل معنا */}
										</Button>
									</div>
								</form>
							</div>

							{/* Contact Information - Right side in Arabic (Order 1), with white background and separator border */}
							<div
								className={`${
									language === "ar" ? "order-1" : "order-2"
								} p-8 bg-white md:border-l border-gray-200`}>
								<h2
									className={`text-2xl font-bold text-gray-900 mb-8 text-center`}>
									{t("contactInfoTitle")} {/* للتواصل */}
								</h2>

								<div className={`space-y-6 text-center`}>
									{/* Address */}
									<div>
										<h3 className='text-lg font-semibold text-gray-900 mb-2'>
											{t("contactAddressLabel")} {/* العنوان */}
										</h3>
										<p className='text-gray-700 text-sm leading-relaxed'>
											{t("contactAddressValue")}
										</p>
									</div>

									{/* Phone */}
									<div>
										<h3 className='text-lg font-semibold text-gray-900 mb-2'>
											{t("contactPhoneLabel")} {/* رقم الھاتف */}
										</h3>
										<p className='text-gray-700 font-medium'>٠١١٥٢٠٦١١١</p>
									</div>

									{/* Social Media */}
									<div>
										<h3 className='text-lg font-semibold text-gray-900 mb-3'>
											{t("contactSocialLabel")} {/* مواقع التواصل الاجتماعي */}
										</h3>
										{/* Rearranged icons to match the image order (roughly) and slightly smaller size */}
										<div className={`flex gap-3 justify-center`}>
											<a
												href='https://www.facebook.com/SHAHEN-SA-105402241801913'
												target='_blank'
												rel='noopener noreferrer'
												className='w-8 h-8 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
												aria-label='Facebook'>
												<Facebook className='w-4 h-4' />
											</a>
											<a
												href='https://www.instagram.com/shahenapp'
												target='_blank'
												rel='noopener noreferrer'
												className='w-8 h-8 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
												aria-label='Instagram'>
												<Instagram className='w-4 h-4' />
											</a>
											<a
												href='https://twitter.com/shahenapp'
												target='_blank'
												rel='noopener noreferrer'
												className='w-8 h-8 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
												aria-label='X (Twitter)'>
												<svg
													className='w-4 h-4'
													viewBox='0 0 24 24'
													fill='currentColor'
													xmlns='http://www.w3.org/2000/svg'>
													<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
												</svg>
											</a>
											<a
												href='https://www.linkedin.com/company/shahen-%D8%B4%D8%AD%D9%86/'
												target='_blank'
												rel='noopener noreferrer'
												className='w-8 h-8 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
												aria-label='LinkedIn'>
												<Linkedin className='w-4 h-4' />
											</a>
											<a
												href='https://www.youtube.com/channel/UCxRUhbWAfLkQldm3QwA73UQ'
												target='_blank'
												rel='noopener noreferrer'
												className='w-8 h-8 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
												aria-label='YouTube'>
												<Youtube className='w-4 h-4' />
											</a>
										</div>
									</div>

									{/* WhatsApp */}
									<div className='pt-4 border-t border-gray-200'>
										<a
											href='https://wa.me/message/TBZQAQHF6WDLN1'
											target='_blank'
											rel='noopener noreferrer'
											className={`flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium justify-center`}>
											<svg
												className='w-6 h-6'
												viewBox='0 0 24 24'
												fill='currentColor'
												xmlns='http://www.w3.org/2000/svg'>
												<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
											</svg>
											<span>{t("contactWhatsApp")}</span> {/* واتس اب */}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;
