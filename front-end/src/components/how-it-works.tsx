"use client";

import { useLanguage } from "../contexts/language-context";

export default function HowItWorks() {
	const { t } = useLanguage();

	return (
		<section className='section about'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 col-sm-12 col-12 mx-auto'>
						<div className='section-header text-center aos' data-aos='fade-up'>
							<h2 className='header-title'>{t("howItWorksTitle")}</h2>
						</div>
					</div>
				</div>
				<div className='row justify-content-center'>
					<div className='col-lg-5'>
						<div
							className='about-img wow animate__ animate__zoomIn animated'
							style={{ visibility: "visible" }}>
							<img
								className='img-fluid'
								src='/delivery-truck-with-driver-illustration.png'
								alt='Truck shipping products'
								loading='lazy'
							/>
						</div>
					</div>
					<div className='col-lg-6 d-flex align-items-center'>
						<div className='about-content'>
							<p>{t("howItWorksDesc")}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
