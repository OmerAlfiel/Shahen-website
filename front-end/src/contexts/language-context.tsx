"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";

type Language = "ar" | "en";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}

const translations = {
	ar: {
		// Header
		home: "الرئيسية",
		business: "الأعمال",
		serviceProviders: "مزودي الخدمة",
		about: "عن المنصة",
		contact: "اتصل بنا",
		login: "تسجيل الدخول",
		logo: "شحن",

		// Hero
		heroTitle: "انقل بضاعتك وحمولاتك أينما ترغب بطريقه سهله وآمنة.",
		orderNow: "اطلب الآن",
		singleDelivery: "موقع توصيل واحد",
		multipleDelivery: "موقعين توصيل",
		pickupLocation: "موقع التحميل",
		deliveryLocation1: "عنوان التسليم 1",
		deliveryLocation2: "عنوان التسليم 2",
		map: "خريطة",
		continueOrder: "متابعة الطلب",

		// Truck Types
		truckTypesIntro:
			"لحرصنا على خدمة عملائنا في جميع القطاعات وفرنا العديد من أحجام شاحنات نقل البضائع بداية من الشاحنات الصغيرة مثل البيك أب والمتوسطة مثل الدينا وصولا للشاحنات الكبيرة كالتريلا واللوري بأنواعها بالإضافة إلى ذلك حرصنا على توفير جميع أنواع الشاحنات مثل الثلاجات والمغلقة الجاف أو جوانب وغيرها من الأنواع وحسب ما يتناسب مع منتجات كل عميل.",
		refrigeratedTruck: "دينا مبرد (4 طن)",
		boxTruck: "دينا بوش (3.5 طن)",
		frozenTruck: "دينا مجمد (4 طن)",
		closedTruck: "دينا صندوق مغلق (4 طن)",
		sidesTruck: "دينا جوانب (4 طن)",
		sizeUpTo: "الحجم يصل إلى 4.5 متر",

		// Features
		insuranceTitle: "تأمين على البضائع",
		insuranceDesc:
			"نسعيا لاختيار شركة تأمين موثوقة ومعروفة بجودة خدماتها. هذا الاختيار سيضمن لك الحصول على خدمة تأمين آمنة ومضمونة تحمي بضائعك وتجارتك.",
		supportTitle: "خدمة على مدار 24 ساعة",
		supportDesc: "لتقديم المساعدة.",
		trackingTitle: "خدمة تتبع الشاحنات",
		trackingDesc:
			"متطورة تمكن العملاء من معرفة موقع الشاحنات في أي وقت عبر التطبيق أو الموقع الإلكتروني.",

		// How It Works
		howItWorksTitle: "سائقي شاحنات متعهدين ومرخصين، كيف يتم ذلك؟",
		howItWorksDesc:
			"نتحقق، نشحن بعناية من نظامية السائقين ورخص الشركات التابعين لها. وبذلك التحقق تم عبر ربط منصة شحن بمنصة وصل التابعة لهيئة النقل وبهدف ذلك إلى تنظيم وإدارة عمليات النقل البري داخل المملكة بشكل آمن وفعال، كما يمكن ذلك الربط من ضبط ومراقبة أنشطة النقل البري، ورصد بيانات الرحلات المنفذة وتنظيم عمليات نقل البضائع ورفع جودتها وتحقيق أعلى معايير الأمن والسلامة.",

		// Order Process
		howToOrder: "آلية الطلب؟",
		step1: "حدد موقع التحميل",
		step2: "اختر حجم الشاحنة ونوعها",
		step3: "ادخل قيمة الحمولة المراد التأمين عليها",
		step4: "حدد موقع التسليم",
		step5: "بعد السداد ادخل رقم مسؤول التحميل والاستلام",
		step6: "تم إرسال الطلب",

		// Partners
		partnersTitle: "الشركاء",

		// Footer
		address: "العنوان",
		addressDetails:
			"Al Muhandis Masaid Al Angari, As Sulimaniyah, Riyadh 12245",
		supportHelp: "المساعدة والدعم",
		contactUs: "تواصل معنا",
		commonQuestions: "الأسئلة الشائعة",
		legal: "المسؤولية القانونية",
		termsOfUse: "شروط الإستخدام",
		privacyPolicy: "سياسة الخصوصية",
		deleteAccount: "حذف حساب مستخدم",
		aboutUs: "من نحن",
		aboutDesc:
			"نقدم للشركات خيارات متعددة من أنواع وأحجام الشاحنات تتناسب مع منتجات الشركة لنقلها إلى أي مدينة أو منطقة داخل السعودية بالإضافة إلى تأميناً على البضائع وتتبع للشاحنات و مدير حساب خاص للشركة لتقديم المساعدة اللازمة وخدمة الطلبات وممیزات أخرى، أكثر تفهم للنقليات و النقل البري، ليكون أكثر سهولة وأمان.",
		nationalNumber: "الرقم الوطني الموحد للمنشأة : 7015321933",
		contactMethods: "وسائل الاتصال",
		copyright:
			"© حقوق النشر 2025 جميع الحقوق محفوظة لشركة COMPANY FIKR FOR COMMUNICATIONS AND INFORMATION TECHNOLOGY",

		// App Download
		downloadApp:
			"نسعى لتحقيق شراكة متميزة عبر تسخير كل الإمكانات لخدمة عملائنا.",
		getOnGooglePlay: "احصل عليه من Google Play",
		downloadOnAppStore: "حمله من App Store",

		// Service Types
		individualShipping: "شحن للأفراد",
		individualDesc:
			"نوفر في شحن أيضا خدمات مميزة لعملائنا الأفراد ولا يقتصر عملنا على الشركات فقط حيث نوفر الشاحنات المتوسطة والصغيرة لنقل الأثاث أو العفش أو لتوصيل الثلاث أو الخمس أو العشر أو الخمسة عشر طن.",
		serviceProviderShipping: "مزودي الخدمة",
		serviceProviderDesc:
			"لديك شركة نقليات أو تملك شاحنة، شحن يوصلك بعملك في مختلف مدن المملكة حيث تكون، مما يجعل من عملك أكثر كفاءة واحترافية كما توفر شحن منصة إلكترونية للمحلي.",
		companyShipping: "شحن للشركات",
		companyDesc:
			"نقدم للشركات خيارات متعددة من أنواع وأحجام الشاحنات بحسب ما يتناسب مع منتجات الشركة لنقلها إلى أي مدينة أو منطقة داخل السعودية بالإضافة إلى تأميناً على البضائع وتتبع",

		// Login Page Translations
		loginTitle: "تسجيل الدخول",
		loginSubtitle: "مرحباً بك مرة أخرى! يرجى تسجيل الدخول إلى حسابك",
		email: "البريد الإلكتروني",
		emailPlaceholder: "أدخل بريدك الإلكتروني",
		password: "كلمة المرور",
		passwordPlaceholder: "أدخل كلمة المرور",
		forgotPassword: "نسيت كلمة المرور؟",
		loginButton: "تسجيل الدخول",
		loggingIn: "جاري تسجيل الدخول...",
		noAccount: "ليس لديك حساب؟",
		signUp: "إنشاء حساب",
		backToHome: "العودة إلى الصفحة الرئيسية",
		loginError: "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.",

		// OTP Login Translations
		phoneNumber: "رقم الجوال",
		phoneNumberPlaceholder: "أدخل رقم جوالك",
		sendOtp: "إرسال رمز التحقق",
		sending: "جاري الإرسال...",
		verifyOtp: "تحقق من رمز التحقق",
		otpSentTo: "تم إرسال رمز التحقق إلى",
		otpCode: "رمز التحقق",
		otpPlaceholder: "أدخل رمز التحقق",
		verifyButton: "تحقق",
		verifying: "جاري التحقق...",
		changePhone: "تغيير رقم الجوال",
		otpSendError: "فشل إرسال رمز التحقق. يرجى المحاولة مرة أخرى.",
		otpVerifyError: "رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.",

		// Profile Completion Translations
		companyInfo: "معلومات الشركة",
		companyName: "اسم الشركة",
		companyNamePlaceholder: "أدخل اسم الشركة",
		taxNumber: "الرقم الضريبي",
		taxNumberPlaceholder: "أدخل الرقم الضريبي",
		city: "المدينة",
		cityPlaceholder: "أدخل المدينة",
		postalCode: "الرمز البريدي",
		postalCodePlaceholder: "أدخل الرمز البريدي",
		companyAddress: "العنوان الأول",
		companyAddressPlaceholder: "أدخل العنوان",
		managerInfo: "معلومات المسؤول",
		managerName: "الاسم",
		managerNamePlaceholder: "أدخل اسم المسؤول",
		createAccount: "إنشاء حساب",
		creating: "جاري الإنشاء...",
		profileCompleteError: "فشل إكمال الملف الشخصي. يرجى المحاولة مرة أخرى.",

		// Dashboard Translations
		dashboard: "لوحة التحكم",
		welcomeToDashboard: "مرحباً بك في لوحة التحكم",
		dashboardComingSoon: "المحتوى قريباً...",
		logout: "تسجيل الخروج",
		loading: "جاري التحميل...",
		totalShipments: "إجمالي الشحنات",
		activeShipments: "الشحنات النشطة",
		completedShipments: "الشحنات المكتملة",
		cancelledShipments: "الشحنات الملغاة",
		allTimeShipments: "جميع الشحنات",
		currentlyInTransit: "قيد النقل حالياً",
		successfulDeliveries: "التسليمات الناجحة",
		growthRate: "معدل النمو",
		vsLastMonth: "مقارنة بالشهر الماضي",
		recentShipments: "الشحنات الأخيرة",
		recentShipmentsDesc: "آخر الشحنات والطلبات الخاصة بك",
		truckType: "نوع الشاحنة",
		date: "التاريخ",
		driver: "السائق",
		driverPhone: "هاتف السائق",
		viewDetails: "عرض التفاصيل",

		// Contact Page Translations
		contactHeroTitle: "لنعمل معا يدا ليد على شراكة متميزة",
		contactHeroSubtitle:
			"هل تريد الانضمام لنا ؟ حمل تطبيق شحن من متجر التطبيقات على هاتفك الذكي",
		contactHeroDescription: "نسعد بزيارتك لنا للحصول على استشارة في مكتب شحن",
		contactFormTitle: "للتواصل",
		contactName: "الاسم",
		contactPhone: "رقم الجوال",
		contactCompany: "اسم الشركة (اختياري)",
		contactMessage: "التعليق",
		contactSubmit: "تواصل معنا",
		contactInfoTitle: "للتواصل",
		contactAddressLabel: "العنوان",
		contactAddressValue: "المهندس مساعد العنقري، السليمانية، الرياض 12245",
		contactPhoneLabel: "رقم الهاتف",
		contactEmailLabel: "البريد الإلكتروني",
		contactSocialLabel: "مواقع التواصل الاجتماعي",
		contactWhatsApp: "واتس اب",
		contactChatHelp: "هل تحتاج إلى مساعدة ؟",
	},
	en: {
		// Header
		home: "Home",
		business: "Business",
		serviceProviders: "Service Providers",
		about: "About",
		contact: "Contact Us",
		login: "Login",
		logo: "Shahen",

		// Hero
		heroTitle:
			"Ship your goods and cargo wherever you want, easily and safely.",
		orderNow: "Order Now",
		singleDelivery: "Single Delivery Location",
		multipleDelivery: "Two Delivery Locations",
		pickupLocation: "Pickup Location",
		deliveryLocation1: "Delivery Address 1",
		deliveryLocation2: "Delivery Address 2",
		map: "Map",
		continueOrder: "Continue Order",

		// Truck Types
		truckTypesIntro:
			"We are committed to serving our customers in all sectors by providing various sizes of freight trucks, from small trucks like pickups and medium ones like Dyna to large trucks like trailers and lorries of all types. In addition, we ensure the availability of all types of trucks such as refrigerated, closed dry, or side trucks and others according to what suits each customer's products.",
		refrigeratedTruck: "Refrigerated Dyna (4 tons)",
		boxTruck: "Box Dyna (3.5 tons)",
		frozenTruck: "Frozen Dyna (4 tons)",
		closedTruck: "Closed Box Dyna (4 tons)",
		sidesTruck: "Side Dyna (4 tons)",
		sizeUpTo: "Size up to 4.5 meters",

		// Features
		insuranceTitle: "Goods Insurance",
		insuranceDesc:
			"We strive to choose a reliable and well-known insurance company for the quality of its services. This choice will ensure you get a safe and guaranteed insurance service that protects your goods and business.",
		supportTitle: "24/7 Service",
		supportDesc: "To provide assistance.",
		trackingTitle: "Truck Tracking Service",
		trackingDesc:
			"Advanced service that enables customers to know the location of trucks at any time via the app or website.",

		// How It Works
		howItWorksTitle: "Committed and Licensed Truck Drivers, How Does It Work?",
		howItWorksDesc:
			"We verify and ship carefully from the regularity of drivers and licenses of their affiliated companies. This verification was done by linking the shipping platform with the Wasl platform affiliated with the Transport Authority, aiming to organize and manage land transport operations within the Kingdom safely and effectively. This link also enables control and monitoring of land transport activities, tracking data of executed trips, organizing freight transport operations, raising their quality, and achieving the highest safety and security standards.",

		// Order Process
		howToOrder: "How to Order?",
		step1: "Set pickup location",
		step2: "Choose truck size and type",
		step3: "Enter the insured cargo value",
		step4: "Set delivery location",
		step5: "After payment, enter the loading and receiving manager number",
		step6: "Order sent",

		// Partners
		partnersTitle: "Partners",

		// Footer
		address: "Address",
		addressDetails:
			"Al Muhandis Masaid Al Angari, As Sulimaniyah, Riyadh 12245",
		supportHelp: "Support & Help",
		contactUs: "Contact Us",
		commonQuestions: "FAQ",
		legal: "Legal Responsibility",
		termsOfUse: "Terms of Use",
		privacyPolicy: "Privacy Policy",
		deleteAccount: "Delete User Account",
		aboutUs: "About Us",
		aboutDesc:
			"We offer companies multiple options of truck types and sizes that suit the company's products to transport them to any city or region within Saudi Arabia, in addition to insurance on goods, truck tracking, and a dedicated account manager for the company to provide necessary assistance, order service, and other features. More understanding of freight and land transport, to be easier and safer.",
		nationalNumber: "Unified National Number for the Establishment: 7015321933",
		contactMethods: "Contact Methods",
		copyright:
			"© Copyright 2025 All rights reserved to COMPANY FIKR FOR COMMUNICATIONS AND INFORMATION TECHNOLOGY",

		// App Download
		downloadApp:
			"We strive to achieve a distinguished partnership by harnessing all capabilities to serve our customers.",
		getOnGooglePlay: "Get it on Google Play",
		downloadOnAppStore: "Download on App Store",

		// Service Types
		individualShipping: "Individual Shipping",
		individualDesc:
			"We also provide distinctive services for our individual customers, and our work is not limited to companies only, as we provide medium and small trucks for transporting furniture or belongings or for delivering three, five, ten, or fifteen tons.",
		serviceProviderShipping: "Service Providers",
		serviceProviderDesc:
			"If you have a freight company or own a truck, shipping connects you with your work in various cities of the Kingdom wherever you are, making your work more efficient and professional. Shipping also provides an electronic platform for local businesses.",
		companyShipping: "Company Shipping",
		companyDesc:
			"We offer companies multiple options of truck types and sizes according to what suits the company's products to transport them to any city or region within Saudi Arabia, in addition to insurance on goods and tracking",

		// Login Page Translations
		loginTitle: "Login",
		loginSubtitle: "Welcome back! Please login to your account",
		email: "Email",
		emailPlaceholder: "Enter your email",
		password: "Password",
		passwordPlaceholder: "Enter your password",
		forgotPassword: "Forgot password?",
		loginButton: "Login",
		loggingIn: "Logging in...",
		noAccount: "Don't have an account?",
		signUp: "Sign up",
		backToHome: "Back to home",
		loginError: "Login failed. Please check your credentials.",

		// OTP Login Translations
		phoneNumber: "Phone Number",
		phoneNumberPlaceholder: "Enter your phone number",
		sendOtp: "Send Verification Code",
		sending: "Sending...",
		verifyOtp: "Verify Code",
		otpSentTo: "Verification code sent to",
		otpCode: "Verification Code",
		otpPlaceholder: "Enter verification code",
		verifyButton: "Verify",
		verifying: "Verifying...",
		changePhone: "Change phone number",
		otpSendError: "Failed to send verification code. Please try again.",
		otpVerifyError: "Invalid verification code. Please try again.",

		// Profile Completion Translations
		companyInfo: "Company Information",
		companyName: "Company Name",
		companyNamePlaceholder: "Enter company name",
		taxNumber: "Tax Number",
		taxNumberPlaceholder: "Enter tax number",
		city: "City",
		cityPlaceholder: "Enter city",
		postalCode: "Postal Code",
		postalCodePlaceholder: "Enter postal code",
		companyAddress: "First Address",
		companyAddressPlaceholder: "Enter address",
		managerInfo: "Manager Information",
		managerName: "Name",
		managerNamePlaceholder: "Enter manager name",
		createAccount: "Create Account",
		creating: "Creating...",
		profileCompleteError: "Failed to complete profile. Please try again.",

		// Dashboard Translations
		dashboard: "Dashboard",
		welcomeToDashboard: "Welcome to Dashboard",
		dashboardComingSoon: "Content coming soon...",
		logout: "Logout",
		loading: "Loading...",
		totalShipments: "Total Shipments",
		activeShipments: "Active Shipments",
		completedShipments: "Completed Shipments",
		cancelledShipments: "Cancelled Shipments",
		allTimeShipments: "All time shipments",
		currentlyInTransit: "Currently in transit",
		successfulDeliveries: "Successful deliveries",
		growthRate: "Growth Rate",
		vsLastMonth: "vs last month",
		recentShipments: "Recent Shipments",
		recentShipmentsDesc: "Your latest shipments and orders",
		truckType: "Truck Type",
		date: "Date",
		driver: "Driver",
		driverPhone: "Driver Phone",
		viewDetails: "View Details",

		// Contact Page Translations
		contactHeroTitle:
			"Let's work together hand in hand on a distinguished partnership",
		contactHeroSubtitle:
			"Do you want to join us? Download the Shahen app from the app store on your smartphone",
		contactHeroDescription:
			"We are happy to have you visit us for a consultation at the Shahen office",
		contactFormTitle: "Contact",
		contactName: "Name",
		contactPhone: "Phone Number",
		contactCompany: "Company Name (Optional)",
		contactMessage: "Comment",
		contactSubmit: "Contact Us",
		contactInfoTitle: "Contact",
		contactAddressLabel: "Address",
		contactAddressValue:
			"Al Muhandis Masaid Al Angari, As Sulimaniyah, Riyadh 12245",
		contactPhoneLabel: "Phone Number",
		contactEmailLabel: "Email",
		contactSocialLabel: "Social Media",
		contactWhatsApp: "WhatsApp",
		contactChatHelp: "Need help?",
	},
};

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguage] = useState<Language>("ar");

	useEffect(() => {
		// Update document direction and lang attribute
		document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
		document.documentElement.lang = language;
	}, [language]);

	const t = (key: string): string => {
		return translations[language][key as keyof typeof translations.ar] || key;
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
