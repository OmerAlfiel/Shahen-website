import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/language-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

type LoginStep = "phone" | "otp" | "complete";

const LoginPage: React.FC = () => {
	const { language, t } = useLanguage();
	const navigate = useNavigate();
	const [step, setStep] = useState<LoginStep>("phone");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otp, setOtp] = useState("");
	const [formData, setFormData] = useState({
		companyName: "",
		email: "",
		taxNumber: "",
		city: "",
		postalCode: "",
		address: "",
		managerName: "",
	});

	const handlePhoneSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/send-otp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phoneNumber }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || t("otpSendError"));
			}

			setStep("otp");
		} catch (err) {
			setError(err instanceof Error ? err.message : t("otpSendError"));
		} finally {
			setIsLoading(false);
		}
	};

	const handleOtpSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/verify-otp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phoneNumber, otp }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || t("otpVerifyError"));
			}

			// Check if user needs to complete profile
			if (data.needsProfile) {
				setStep("complete");
			} else {
				// User already has profile, redirect to dashboard
				navigate("/dashboard");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : t("otpVerifyError"));
		} finally {
			setIsLoading(false);
		}
	};

	const handleCompleteProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/complete-profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phoneNumber, ...formData }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || t("profileCompleteError"));
			}

			// Redirect to dashboard
			navigate("/dashboard");
		} catch (err) {
			setError(err instanceof Error ? err.message : t("profileCompleteError"));
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div
			className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12'
			dir={language === "ar" ? "rtl" : "ltr"}>
			<div className='w-full max-w-2xl'>
				{/* Logo */}
				<div
					className={`mb-8 ${language === "ar" ? "text-right" : "text-left"}`}>
					<a href='/' className='inline-block'>
						<span className='text-3xl font-bold text-emerald-600'>
							{t("logo")}
						</span>
					</a>
				</div>

				{/* Login Card */}
				<div className='bg-white rounded-2xl shadow-lg p-8'>
					{/* Step 1: Phone Number */}
					{step === "phone" && (
						<>
							<h1 className='text-2xl font-bold text-gray-900 mb-2'>
								{t("loginTitle")}
							</h1>
							<p className='text-gray-600 mb-6'>{t("loginSubtitle")}</p>

							<form onSubmit={handlePhoneSubmit} className='space-y-5'>
								<div className='space-y-2'>
									<Label
										htmlFor='phoneNumber'
										className='text-gray-700 font-medium'>
										{t("phoneNumber")}
									</Label>
									<Input
										id='phoneNumber'
										name='phoneNumber'
										type='tel'
										required
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
										placeholder={t("phoneNumberPlaceholder")}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
										disabled={isLoading}
									/>
								</div>

								{error && (
									<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
										{error}
									</div>
								)}

								<Button
									type='submit'
									disabled={isLoading}
									className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'>
									{isLoading ? t("sending") : t("sendOtp")}
								</Button>
							</form>
						</>
					)}

					{/* Step 2: OTP Verification */}
					{step === "otp" && (
						<>
							<h1 className='text-2xl font-bold text-gray-900 mb-2'>
								{t("verifyOtp")}
							</h1>
							<p className='text-gray-600 mb-6'>
								{t("otpSentTo")} {phoneNumber}
							</p>

							<form onSubmit={handleOtpSubmit} className='space-y-5'>
								<div className='space-y-2'>
									<Label htmlFor='otp' className='text-gray-700 font-medium'>
										{t("otpCode")}
									</Label>
									<Input
										id='otp'
										name='otp'
										type='text'
										required
										value={otp}
										onChange={(e) => setOtp(e.target.value)}
										placeholder={t("otpPlaceholder")}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center text-2xl tracking-widest'
										maxLength={6}
										disabled={isLoading}
									/>
								</div>

								{error && (
									<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
										{error}
									</div>
								)}

								<Button
									type='submit'
									disabled={isLoading}
									className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'>
									{isLoading ? t("verifying") : t("verifyButton")}
								</Button>

								<button
									type='button'
									onClick={() => setStep("phone")}
									className='w-full text-emerald-600 hover:text-emerald-700 text-sm font-medium'>
									{t("changePhone")}
								</button>
							</form>
						</>
					)}

					{/* Step 3: Complete Profile */}
					{step === "complete" && (
						<>
							<form onSubmit={handleCompleteProfile} className='space-y-8'>
								{/* Company Information */}
								<div>
									<h2 className='text-xl font-bold text-gray-900 mb-4'>
										{t("companyInfo")}
									</h2>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
										<div className='space-y-2'>
											<Label
												htmlFor='companyName'
												className='text-gray-700 font-medium'>
												{t("companyName")} *
											</Label>
											<Input
												id='companyName'
												name='companyName'
												type='text'
												required
												value={formData.companyName}
												onChange={handleChange}
												placeholder={t("companyNamePlaceholder")}
												className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
												disabled={isLoading}
											/>
										</div>

										<div className='space-y-2'>
											<Label
												htmlFor='email'
												className='text-gray-700 font-medium'>
												{t("email")} *
											</Label>
											<Input
												id='email'
												name='email'
												type='email'
												required
												value={formData.email}
												onChange={handleChange}
												placeholder={t("emailPlaceholder")}
												className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
												disabled={isLoading}
											/>
										</div>

										<div className='space-y-2'>
											<Label
												htmlFor='taxNumber'
												className='text-gray-700 font-medium'>
												{t("taxNumber")} *
											</Label>
											<Input
												id='taxNumber'
												name='taxNumber'
												type='text'
												required
												value={formData.taxNumber}
												onChange={handleChange}
												placeholder={t("taxNumberPlaceholder")}
												className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
												disabled={isLoading}
											/>
										</div>

										<div className='space-y-2'>
											<Label
												htmlFor='city'
												className='text-gray-700 font-medium'>
												{t("city")} *
											</Label>
											<Input
												id='city'
												name='city'
												type='text'
												required
												value={formData.city}
												onChange={handleChange}
												placeholder={t("cityPlaceholder")}
												className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
												disabled={isLoading}
											/>
										</div>

										<div className='space-y-2'>
											<Label
												htmlFor='postalCode'
												className='text-gray-700 font-medium'>
												{t("postalCode")} *
											</Label>
											<Input
												id='postalCode'
												name='postalCode'
												type='text'
												required
												value={formData.postalCode}
												onChange={handleChange}
												placeholder={t("postalCodePlaceholder")}
												className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
												disabled={isLoading}
											/>
										</div>

										<div className='space-y-2'>
											<Label
												htmlFor='address'
												className='text-gray-700 font-medium'>
												{t("companyAddress")} *
											</Label>
											<Input
												id='address'
												name='address'
												type='text'
												required
												value={formData.address}
												onChange={handleChange}
												placeholder={t("companyAddressPlaceholder")}
												className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
												disabled={isLoading}
											/>
										</div>
									</div>
								</div>

								{/* Manager Information */}
								<div>
									<h2 className='text-xl font-bold text-gray-900 mb-4'>
										{t("managerInfo")}
									</h2>
									<div className='space-y-2'>
										<Label
											htmlFor='managerName'
											className='text-gray-700 font-medium'>
											{t("managerName")} *
										</Label>
										<Input
											id='managerName'
											name='managerName'
											type='text'
											required
											value={formData.managerName}
											onChange={handleChange}
											placeholder={t("managerNamePlaceholder")}
											className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
											disabled={isLoading}
										/>
									</div>
								</div>

								{error && (
									<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
										{error}
									</div>
								)}

								<Button
									type='submit'
									disabled={isLoading}
									className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'>
									{isLoading ? t("creating") : t("createAccount")}
								</Button>
							</form>
						</>
					)}
				</div>

				{/* Back to Home */}
				<div className='mt-6 text-center'>
					<a href='/' className='text-gray-600 hover:text-gray-900 text-sm'>
						{language === "ar" ? "→" : "←"} {t("backToHome")}
					</a>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
