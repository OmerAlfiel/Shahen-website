import * as Dialog from "@radix-ui/react-dialog";
import { addDays, format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { useMemo, useState } from "react";
import { useLanguage } from "../../contexts/language-context";

export interface DateTimePickerValue {
	date: Date;
	time: string;
}

export interface DateTimePickerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSelect: (value: DateTimePickerValue) => void;
}

export default function DateTimePicker({
	open,
	onOpenChange,
	onSelect,
}: DateTimePickerProps) {
	const { language } = useLanguage();
	const [selectedDateIndex, setSelectedDateIndex] = useState(0);
	const [selectedTime, setSelectedTime] = useState<string>(
		"10:00 AM - 12:00 PM"
	);

	const dates = useMemo(() => {
		const start = new Date();
		// Next 7 days including today
		return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
	}, []);

	const timeSlots = [
		"10:00 AM - 12:00 PM",
		"12:00 PM - 02:00 PM",
		"02:00 PM - 04:00 PM",
		"04:00 PM - 06:00 PM",
		"06:00 PM - 08:00 PM",
	];

	const weekday = (d: Date) =>
		format(d, language === "ar" ? "EEEE d MMM" : "EEE, MMM d", {
			locale: language === "ar" ? (arSA as any) : enUS,
		});

	const confirm = () => {
		onSelect({ date: dates[selectedDateIndex], time: selectedTime });
		onOpenChange(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 z-50' />
				<Dialog.Content className='fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95vw] max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden'>
					<div className='p-4 border-b border-gray-200 flex items-center justify-between'>
						<Dialog.Title className='text-lg font-bold text-gray-800'>
							{language === "ar" ? "اختر التاريخ والوقت" : "Select Date & Time"}
						</Dialog.Title>
						<Dialog.Close className='p-2 hover:bg-gray-100 rounded-lg'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</Dialog.Close>
					</div>

					<div className='grid grid-cols-2 gap-0 max-h-[65vh] overflow-hidden'>
						{/* Dates list */}
						<div
							className='border-l border-gray-200 overflow-y-auto'
							dir={language === "ar" ? "rtl" : "ltr"}>
							{dates.map((d, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedDateIndex(idx)}
									className={`w-full px-4 py-3 border-b border-gray-100 text-sm text-gray-800 text-center hover:bg-gray-50 ${
										idx === selectedDateIndex
											? "bg-emerald-50 font-bold"
											: "bg-white"
									}`}
									title={weekday(d)}>
									{weekday(d)}
								</button>
							))}
						</div>
						{/* Times list */}
						<div className='overflow-y-auto'>
							{timeSlots.map((slot) => (
								<button
									key={slot}
									onClick={() => setSelectedTime(slot)}
									className={`w-full px-4 py-4 border-b border-gray-100 text-center text-sm hover:bg-gray-50 ${
										selectedTime === slot
											? "bg-emerald-50 font-bold"
											: "bg-white"
									}`}>
									{language === "ar"
										? slot
												.replace("AM", "ص")
												.replace("PM", "م")
												.replace("-", "-")
										: slot}
								</button>
							))}
						</div>
					</div>

					<div className='p-4 border-t border-gray-200 flex gap-3'>
						<button
							onClick={confirm}
							className='flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl'>
							{language === "ar" ? "تأكيد" : "Confirm"}
						</button>
						<Dialog.Close className='flex-1 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl'>
							{language === "ar" ? "إلغاء" : "Cancel"}
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
