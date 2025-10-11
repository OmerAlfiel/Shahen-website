"use client";

import React from "react";
import { useLanguage } from "../../contexts/language-context";

export default function DashboardPage() {
	const { t } = useLanguage();

	return (
		<div className='min-h-screen bg-gray-50 pt-20 p-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold text-gray-900 mb-8'>
					{t("dashboard")}
				</h1>
				<div className='bg-white rounded-lg shadow p-6'>
					<p className='text-gray-600'>{t("dashboardComingSoon")}</p>
				</div>
			</div>
		</div>
	);
}
