import React, { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const ContactPage: React.FC = () => {
	const { language, t } = useLanguage();
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		company: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Mock API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		console.log("[v0] Contact form submitted:", formData);
		alert(
			language === "ar"
				? "تم إرسال رسالتك بنجاح!"
				: "Your message has been sent successfully!"
		);

		// Reset form
		setFormData({
			name: "",
			phone: "",
			company: "",
			message: "",
		});
		setIsSubmitting(false);
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
		<div className='min-h-screen bg-gray-50'>
			<section className='relative h-[600px]'>
				{/* Green Background - Fixed position */}
				<div className='fixed top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden pointer-events-none z-0'>
					{/* Decorative Background Elements */}
					<div className='absolute inset-0 overflow-hidden'>
						{/* Left illustration area */}
						<div className='absolute left-0 top-0 w-1/3 h-full'>
							<svg
								viewBox='0 0 400 600'
								className='absolute left-0 top-0 w-full h-full'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M0,0 Q100,150 0,300 Q100,450 0,600 L0,0 Z'
									fill='#10B981'
									opacity='0.15'
								/>
								<path
									d='M50,100 Q120,200 50,350 Q120,500 50,600 L0,600 L0,100 Z'
									fill='#34D399'
									opacity='0.1'
								/>
							</svg>
							{/* Person with laptop illustration placeholder */}
							<div className='absolute left-8 top-32 w-64 h-64 opacity-80'>
								<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
									{/* Simple person illustration */}
									<ellipse cx='100' cy='180' rx='80' ry='20' fill='#E5E7EB' />
									<rect
										x='60'
										y='120'
										width='80'
										height='50'
										rx='5'
										fill='#6B7280'
									/>
									<rect
										x='65'
										y='125'
										width='70'
										height='35'
										rx='3'
										fill='#9CA3AF'
									/>
									<circle cx='100' cy='80' r='25' fill='#FCD34D' />
									<path
										d='M75,80 Q75,100 100,110 Q125,100 125,80'
										fill='#10B981'
									/>
								</svg>
							</div>
						</div>

						{/* Right decorative shapes */}
						<div className='absolute right-0 top-0 w-1/3 h-full'>
							<svg
								viewBox='0 0 400 600'
								className='absolute right-0 top-0 w-full h-full'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M400,100 Q350,200 400,300 Q350,400 400,500 L400,100 Z'
									fill='#6EE7B7'
									opacity='0.15'
								/>
								<circle cx='350' cy='150' r='40' fill='#10B981' opacity='0.1' />
								<circle cx='320' cy='350' r='60' fill='#34D399' opacity='0.1' />
							</svg>
						</div>
					</div>
				</div>

				{/* Hero Content - Scrolls normally */}
				<div className='relative z-10 pt-32 pb-16'>
					<div className='container mx-auto px-4'>
						<div className='max-w-4xl mx-auto text-center'>
							<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance'>
								{t("contactHeroTitle")}
							</h1>
							<p className='text-lg md:text-xl text-gray-700 leading-relaxed text-pretty'>
								{t("contactHeroSubtitle")}
							</p>
							<p className='text-base md:text-lg text-gray-600 mt-4 text-pretty'>
								{t("contactHeroDescription")}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='relative bg-gray-50 py-16 z-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-8'>
						{/* Contact Form Card */}
						<div className='bg-white rounded-2xl shadow-lg p-8 order-2 md:order-1'>
							<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
								{t("contactFormTitle")}
							</h2>

							<form onSubmit={handleSubmit} className='space-y-6'>
								<div>
									<label
										htmlFor='name'
										className='block text-sm font-medium text-gray-700 mb-2 text-right'>
										{t("contactName")}
									</label>
									<Input
										id='name'
										name='name'
										type='text'
										required
										value={formData.name}
										onChange={handleChange}
										className='w-full text-right'
										dir='rtl'
									/>
								</div>

								<div>
									<label
										htmlFor='phone'
										className='block text-sm font-medium text-gray-700 mb-2 text-right'>
										{t("contactPhone")}
									</label>
									<Input
										id='phone'
										name='phone'
										type='tel'
										required
										value={formData.phone}
										onChange={handleChange}
										className='w-full text-right'
										dir='rtl'
									/>
								</div>

								<div>
									<label
										htmlFor='company'
										className='block text-sm font-medium text-gray-700 mb-2 text-right'>
										{t("contactCompany")}
									</label>
									<Input
										id='company'
										name='company'
										type='text'
										value={formData.company}
										onChange={handleChange}
										className='w-full text-right'
										dir='rtl'
									/>
								</div>

								<div>
									<label
										htmlFor='message'
										className='block text-sm font-medium text-gray-700 mb-2 text-right'>
										{t("contactMessage")}
									</label>
									<Textarea
										id='message'
										name='message'
										rows={4}
										value={formData.message}
										onChange={handleChange}
										className='w-full text-right resize-none'
										dir='rtl'
									/>
								</div>

								<Button
									type='submit'
									disabled={isSubmitting}
									className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium text-lg'>
									{isSubmitting ? t("sending") : t("contactSubmit")}
								</Button>
							</form>
						</div>

						{/* Contact Info Card */}
						<div className='bg-white rounded-2xl shadow-lg p-8 order-1 md:order-2'>
							<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
								{t("contactInfoTitle")}
							</h2>

							<div className='space-y-6 text-right' dir='rtl'>
								{/* Address */}
								<div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t("contactAddressLabel")}
									</h3>
									<p className='text-gray-700 leading-relaxed'>
										{t("contactAddressValue")}
									</p>
								</div>

								{/* Phone */}
								<div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t("contactPhoneLabel")}
									</h3>
									<p className='text-gray-700 text-xl font-medium' dir='ltr'>
										٠١١٥٦٣١١١١
									</p>
								</div>

								{/* Email */}
								<div>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{t("contactEmailLabel")}
									</h3>
									<a
										href='mailto:care@shahen-sa.com'
										className='text-emerald-600 hover:text-emerald-700 font-medium'>
										care@shahen-sa.com
									</a>
								</div>

								{/* Social Media */}
								<div>
									<h3 className='text-lg font-semibold text-gray-900 mb-3'>
										{t("contactSocialLabel")}
									</h3>
									<div className='flex gap-3 justify-end'>
										<a
											href='https://facebook.com/shahen'
											target='_blank'
											rel='noopener noreferrer'
											className='w-10 h-10 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
											aria-label='Facebook'>
											<Facebook className='w-5 h-5' />
										</a>
										<a
											href='https://instagram.com/shahen'
											target='_blank'
											rel='noopener noreferrer'
											className='w-10 h-10 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
											aria-label='Instagram'>
											<Instagram className='w-5 h-5' />
										</a>
										<a
											href='https://twitter.com/shahen'
											target='_blank'
											rel='noopener noreferrer'
											className='w-10 h-10 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
											aria-label='X (Twitter)'>
											<svg
												className='w-5 h-5'
												viewBox='0 0 24 24'
												fill='currentColor'
												xmlns='http://www.w3.org/2000/svg'>
												<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
											</svg>
										</a>
										<a
											href='https://linkedin.com/company/shahen'
											target='_blank'
											rel='noopener noreferrer'
											className='w-10 h-10 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
											aria-label='LinkedIn'>
											<Linkedin className='w-5 h-5' />
										</a>
										<a
											href='https://youtube.com/@shahen'
											target='_blank'
											rel='noopener noreferrer'
											className='w-10 h-10 rounded-lg border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors'
											aria-label='YouTube'>
											<Youtube className='w-5 h-5' />
										</a>
									</div>
								</div>

								{/* WhatsApp */}
								<div className='pt-4 border-t border-gray-200'>
									<a
										href='https://wa.me/966115631111'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center justify-end gap-2 text-emerald-600 hover:text-emerald-700 font-medium'>
										<span>{t("contactWhatsApp")}</span>
										<svg
											className='w-6 h-6'
											viewBox='0 0 24 24'
											fill='currentColor'
											xmlns='http://www.w3.org/2000/svg'>
											<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Chat Widget */}
			<div className='fixed bottom-6 right-6 z-50'>
				<button
					className='bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110'
					aria-label='Chat support'>
					<svg
						className='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
						/>
					</svg>
				</button>
				<div className='absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 text-sm whitespace-nowrap'>
					{t("contactChatHelp")}
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
