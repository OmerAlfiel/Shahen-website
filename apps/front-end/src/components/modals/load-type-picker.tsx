import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useLanguage } from "../../contexts/language-context";

type LoadType = {
	id: number;
	nameAr: string;
	nameEn: string;
	askDetails?: boolean;
};

export interface LoadTypePickerValue {
	loadType: string; // label
	quantity?: number;
	exact?: string;
}

export interface LoadTypePickerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSelect: (value: LoadTypePickerValue) => void;
}

const types: LoadType[] = [
	{ id: 0, nameAr: "مواد غذائية", nameEn: "Food Materials", askDetails: true },
	{
		id: 1,
		nameAr: "مواد بناء",
		nameEn: "Building Materials",
		askDetails: true,
	},
	{
		id: 2,
		nameAr: "قطع غيار سيارات",
		nameEn: "Car Spare Parts",
		askDetails: true,
	},
	{
		id: 3,
		nameAr: "عدد وأدوات",
		nameEn: "Tools & Equipment",
		askDetails: true,
	},
	{ id: 4, nameAr: "علف", nameEn: "Fodder", askDetails: true },
	{ id: 5, nameAr: "حاوية 20 قدم", nameEn: "20 ft Container" },
	{ id: 6, nameAr: "حاوية 40 قدم", nameEn: "40 ft Container" },
	{ id: 7, nameAr: "غرف جاهزة", nameEn: "Prefab Rooms" },
	{ id: 8, nameAr: "أخرى", nameEn: "Other", askDetails: true },
];

export default function LoadTypePicker({
	open,
	onOpenChange,
	onSelect,
}: LoadTypePickerProps) {
	const { language } = useLanguage();
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [quantity, setQuantity] = useState<string>("");
	const [exact, setExact] = useState<string>("");

	const submit = () => {
		const selected = types.find((t) => t.id === selectedId);
		if (!selected) return;
		onSelect({
			loadType: language === "ar" ? selected.nameAr : selected.nameEn,
			quantity: quantity ? Number(quantity) : undefined,
			exact: exact || undefined,
		});
		onOpenChange(false);
		setQuantity("");
		setExact("");
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 z-50' />
				<Dialog.Content className='fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95vw] max-w-xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden'>
					<div className='p-4 border-b border-gray-200 flex items-center justify-between'>
						<Dialog.Title className='text-lg font-bold text-gray-800'>
							{language === "ar" ? "اختر نوع الحمولة" : "Choose Load Type"}
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

					<div
						className='p-4 space-y-2 max-h-[60vh] overflow-y-auto'
						dir={language === "ar" ? "rtl" : "ltr"}>
						{types.map((t) => (
							<button
								key={t.id}
								onClick={() => setSelectedId(t.id)}
								className={`w-full text-${
									language === "ar" ? "right" : "left"
								} px-4 py-3 border rounded-xl transition-colors ${
									selectedId === t.id
										? "border-emerald-400 bg-emerald-50"
										: "border-gray-200 hover:bg-gray-50"
								}`}>
								<div className='flex items-center justify-between gap-3'>
									<span className='text-gray-800 font-semibold'>
										{language === "ar" ? t.nameAr : t.nameEn}
									</span>
									{selectedId === t.id && (
										<svg
											className='w-5 h-5 text-emerald-600'
											fill='currentColor'
											viewBox='0 0 20 20'>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 10.435a1 1 0 011.414-1.414l3.222 3.222 6.657-6.657a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									)}
								</div>
								{selectedId === t.id && t.askDetails && (
									<div className='mt-3 grid grid-cols-1 gap-2'>
										<input
											type='number'
											inputMode='numeric'
											className='w-full h-11 rounded-lg border border-gray-200 px-3 text-right'
											placeholder={
												language === "ar"
													? "ادخل كمية الحمولة"
													: "Enter quantity"
											}
											value={quantity}
											onChange={(e) => setQuantity(e.target.value)}
										/>
										<input
											type='text'
											className='w-full h-11 rounded-lg border border-gray-200 px-3 text-right'
											placeholder={
												language === "ar"
													? "ادخل نوع الحمولة"
													: "Enter exact type"
											}
											value={exact}
											onChange={(e) => setExact(e.target.value)}
										/>
									</div>
								)}
							</button>
						))}
					</div>

					<div className='p-4 border-t border-gray-200'>
						<button
							onClick={submit}
							disabled={selectedId === null}
							className='w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl'>
							{language === "ar" ? "تم" : "Done"}
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
