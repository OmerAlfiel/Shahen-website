"use client";

import { useLanguage } from "../contexts/language-context";
import AnimatedSection from "./animated-section";

export default function OrderProcess() {
	const { language, t } = useLanguage();

	const groups: [string, string][] = [
		[t("step1"), t("step2")],
		[t("step3"), t("step4")],
		[t("step5"), t("step6")],
	];

	const isArabic = language === "ar";

	return (
		<section
			className='bg-white flex items-center justify-center min-h-screen'
			style={{ padding: "80px 0px" }}>
			<div className='container mx-auto px-2'>
				<AnimatedSection animation='slide-in-left'>
					<div className='max-w-4xl mx-auto flex justify-center'>
						{/* When Arabic, render video first so it lands on the right (inline-start) */}
						{isArabic ? (
							<div className='flex flex-col md:flex-row items-center bg-white rounded-3xl p-8 shadow-lg gap-8'>
								{/* Video first */}
								<div className='w-full md:w-[150px] lg:w-[250px]'>
									<video
										className='w-full h-auto rounded-2xl shadow-xl border border-gray-200'
										autoPlay
										muted
										loop
										playsInline
										poster='/placeholder.jpg'>
										<source
											src='/images/compressedmobilear.mp4'
											type='video/mp4'
										/>
										<source
											src='/images/compressedmobilear.mp4'
											type='video/ogg'
										/>
									</video>
								</div>

								{/* Text second */}
								<div dir='rtl' className='text-start flex-1'>
									<h2 className='text-3xl md:text-4xl font-bold text-[#1f2937] mb-6'>
										{t("howToOrder")}
									</h2>

									{/* First block */}
									<div className='flex items-start mb-6'>
										<p className='border-r-2 pr-4 border-gray-300 text-[#1f2937] leading-8 text-lg'>
											{groups[0][0]}
											<br />
											{groups[0][1]}
										</p>
									</div>

									{/* Second block */}
									<div className='flex items-start mb-6'>
										<p className='border-r-2 pr-4 border-gray-300 text-[#1f2937] leading-8 text-lg'>
											{groups[1][0]}
											<br />
											{groups[1][1]}
										</p>
									</div>

									{/* Third block */}
									<div className='flex items-start'>
										<p className='border-r-2 pr-4 border-gray-300 text-[#1f2937] leading-8 text-lg'>
											{groups[2][0]}
											<br />
											{groups[2][1]}
										</p>
									</div>
								</div>
							</div>
						) : (
							<div className='flex flex-col md:flex-row items-center bg-white rounded-3xl p-8 shadow-lg gap-8'>
								{/* LTR: Text first */}
								<div
									dir={isArabic ? "rtl" : "ltr"}
									className='text-start flex-1'>
									<h2 className='text-3xl md:text-4xl font-bold text-[#1f2937] mb-6'>
										{t("howToOrder")}
									</h2>

									{/* First block */}
									<div className='flex items-start mb-6'>
										<p className='border-l-2 pl-4 border-gray-300 text-[#1f2937] leading-8 text-lg'>
											{groups[0][0]}
											<br />
											{groups[0][1]}
										</p>
									</div>

									{/* Second block */}
									<div className='flex items-start mb-6'>
										<p className='border-l-2 pl-4 border-gray-300 text-[#1f2937] leading-8 text-lg'>
											{groups[1][0]}
											<br />
											{groups[1][1]}
										</p>
									</div>

									{/* Third block */}
									<div className='flex items-start'>
										<p className='border-l-2 pl-4 border-gray-300 text-[#1f2937] leading-8 text-lg'>
											{groups[2][0]}
											<br />
											{groups[2][1]}
										</p>
									</div>
								</div>

								{/* Video second */}
								<div className='w-full md:w-[350px] lg:w-[400px]'>
									<video
										className='w-full h-auto rounded-2xl shadow-xl border border-gray-200'
										autoPlay
										muted
										loop
										playsInline
										poster='/placeholder.jpg'>
										<source
											src='/images/compressedmobilear.mp4'
											type='video/mp4'
										/>
										<source
											src='/images/compressedmobilear.mp4'
											type='video/ogg'
										/>
									</video>
								</div>
							</div>
						)}
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
}
