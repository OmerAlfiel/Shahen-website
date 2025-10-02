import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/language-context";
import Header from "./components/header";
import Footer from "./components/footer";
import FixedBackground from "./components/fixed-background";
import HomePage from "./pages/home";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import TrackingPage from "./pages/tracking";
import "./styles/globals.css";

function App() {
	return (
		<LanguageProvider>
			<Router>
				{/* Fixed Background Layer */}
				<FixedBackground />

				{/* Main Content Layer */}
				<div className='min-h-screen flex flex-col relative z-10'>
					<Header />
					<main className='flex-1'>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/contact' element={<ContactPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/dashboard' element={<DashboardPage />} />
							<Route path='/tracking' element={<TrackingPage />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</LanguageProvider>
	);
}

export default App;
