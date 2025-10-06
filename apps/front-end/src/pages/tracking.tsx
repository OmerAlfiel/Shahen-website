import React from "react";
import { useLanguage } from "../contexts/language-context";

const TrackingPage: React.FC = () => {
	const { t } = useLanguage();

	return (
		<div className='min-h-screen bg-gray-50 p-8'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold text-gray-900 mb-8'>
					{t("tracking")}
				</h1>
				<div className='bg-white rounded-lg shadow p-6'>
					<p className='text-gray-600'>{t("trackingContent")}</p>
				</div>
			</div>
		</div>
	);
};

export default TrackingPage;
