import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "../contexts/language-context";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/basic.css";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: "Shahen - شحن",
	description:
		"Reliable freight and cargo transportation services in Saudi Arabia",
	icons: {
		icon: "/favicon.ico",
		apple: "/logo192.png",
	},
	manifest: "/manifest.json",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#000000",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ar' suppressHydrationWarning>
			<head>
				<link
					href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css'
					rel='stylesheet'
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function () {
								function setVH() {
									var vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight) * 0.01;
									document.documentElement.style.setProperty("--vh", vh + "px");
								}
								setVH();
								window.addEventListener("orientationchange", setVH);
								window.addEventListener("resize", setVH);
								window.visualViewport && window.visualViewport.addEventListener("resize", setVH);
							})();
						`,
					}}
				/>
			</head>
			<body>
				<LanguageProvider>
					<div className='min-h-screen flex flex-col relative z-10'>
						<Header />
						<main className='flex-1'>{children}</main>
						<Footer />
					</div>
				</LanguageProvider>
			</body>
		</html>
	);
}
