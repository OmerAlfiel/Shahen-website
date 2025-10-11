"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useMemo, useState } from "react";
import { useLanguage } from "../../contexts/language-context";

type TruckItem = {
	nameAr: string;
	nameEn: string;
	sizeAr: string;
	sizeEn: string;
	image: string;
	categoryId: string;
};

type TruckCategory = {
	id: string;
	nameAr: string;
	nameEn: string;
	image: string;
};

export interface TruckPickerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSelect: (truck: TruckItem) => void;
}

export default function TruckPicker({
	open,
	onOpenChange,
	onSelect,
}: TruckPickerProps) {
	const { language } = useLanguage();
	const [activeCategory, setActiveCategory] = useState<string>("Traila");

	const categories: TruckCategory[] = useMemo(
		() => [
			{
				id: "Traila",
				nameAr: "تریلا",
				nameEn: "Traila",
				image: "/images/trucks/traila.png",
			},
			{
				id: "Six",
				nameAr: "سقس",
				nameEn: "Six",
				image: "/images/trucks/traila.png",
			},
			{
				id: "Lorry",
				nameAr: "لوري",
				nameEn: "Lorry",
				image: "/images/trucks/traila.png",
			},
			{
				id: "Diana",
				nameAr: "دینا",
				nameEn: "Diana",
				image: "/images/trucks/traila.png",
			},
		],
		[]
	);

	const truckTypes: Record<string, TruckItem[]> = useMemo(
		() => ({
			Traila: [
				{
					nameAr: "تریلا ثلاجة مبرد (20 طن)",
					nameEn: "Refrigerated Trailer (20 tons)",
					sizeAr: "الحجم یصل إلى 13.5 متر",
					sizeEn: "Size up to 13.5 meters",
					image: "/images/truckTypes/Trailla/sides.png",
					categoryId: "Traila",
				},
				{
					nameAr: "تریلا جوانب (20 طن)",
					nameEn: "Side Trailer (20 tons)",
					sizeAr: "الحجم یصل إلى 13.5 متر",
					sizeEn: "Size up to 13.5 meters",
					image: "/images/truckTypes/Trailla/sides.png",
					categoryId: "Traila",
				},
				{
					nameAr: "تریلا جوانب ألماني ( 25 طن)",
					nameEn: "German Side Trailer (25 tons)",
					sizeAr: "الحجم یصل إلى 13.5 متر",
					sizeEn: "Size up to 13.5 meters",
					image: "/images/truckTypes/Trailla/sides.png",
					categoryId: "Traila",
				},
				{
					nameAr: "تریلا ستارة (25 طن)",
					nameEn: "Curtain Trailer (25 tons)",
					sizeAr: "الحجم یصل إلى 13.5 متر",
					sizeEn: "Size up to 13.5 meters",
					image: "/images/truckTypes/Trailla/sides.png",
					categoryId: "Traila",
				},
				{
					nameAr: "تریلا سطحة (25 طن)",
					nameEn: "Flatbed Trailer (25 tons)",
					sizeAr: "الحجم یصل إلى 13.5 متر",
					sizeEn: "Size up to 13.5 meters",
					image: "/images/truckTypes/Trailla/sides.png",
					categoryId: "Traila",
				},
				{
					nameAr: "تریلا ثلاجة مجمد (20 طن)",
					nameEn: "Frozen Trailer (20 tons)",
					sizeAr: "الحجم یصل إلى 13.5 متر",
					sizeEn: "Size up to 13.5 meters",
					image: "/images/truckTypes/Trailla/sides.png",
					categoryId: "Traila",
				},
			],
			Six: [
				{
					nameAr: "سقس جوانب ( 13 طن)",
					nameEn: "Six Side (13 tons)",
					sizeAr: "الحجم یصل إلى 7 متر",
					sizeEn: "Size up to 7 meters",
					image: "/images/truckTypes/Six/sides.png",
					categoryId: "Six",
				},
				{
					nameAr: "سقس ثلاجة مبرد ( 13 طن)",
					nameEn: "Six Refrigerated (13 tons)",
					sizeAr: "الحجم یصل إلى 7 متر",
					sizeEn: "Size up to 7 meters",
					image: "/images/truckTypes/Six/sides.png",
					categoryId: "Six",
				},
			],
			Lorry: [
				{
					nameAr: "لوري ثلاجة مبرد ( 8 طن)",
					nameEn: "Lorry Refrigerated (8 tons)",
					sizeAr: "الحجم یصل إلى 6.5 متر",
					sizeEn: "Size up to 6.5 meters",
					image: "/images/truckTypes/Lorry/refrigerator.png",
					categoryId: "Lorry",
				},
				{
					nameAr: "لوري جوانب (8 طن)",
					nameEn: "Lorry Side (8 tons)",
					sizeAr: "الحجم یصل إلى 6.5 متر",
					sizeEn: "Size up to 6.5 meters",
					image: "/images/truckTypes/Lorry/refrigerator.png",
					categoryId: "Lorry",
				},
				{
					nameAr: "لوري مجمد (8 طن)",
					nameEn: "Lorry Frozen (8 tons)",
					sizeAr: "الحجم یصل إلى 6.25 متر",
					sizeEn: "Size up to 6.25 meters",
					image: "/images/truckTypes/Lorry/refrigerator.png",
					categoryId: "Lorry",
				},
				{
					nameAr: "لوري صندوق مغلق (8 طن)",
					nameEn: "Lorry Closed Box (8 tons)",
					sizeAr: "الحجم یصل إلى 6.5 متر",
					sizeEn: "Size up to 6.5 meters",
					image: "/images/truckTypes/Lorry/refrigerator.png",
					categoryId: "Lorry",
				},
				{
					nameAr: "لوري بونش (5 طن)",
					nameEn: "Lorry Crane (5 tons)",
					sizeAr: "الحجم یصل إلى 6.5 متر",
					sizeEn: "Size up to 6.5 meters",
					image: "/images/truckTypes/Lorry/refrigerator.png",
					categoryId: "Lorry",
				},
				{
					nameAr: "لوري بونش (7 طن)",
					nameEn: "Lorry Crane (7 tons)",
					sizeAr: "الحجم یصل إلى 6.5 متر",
					sizeEn: "Size up to 6.5 meters",
					image: "/images/truckTypes/Lorry/refrigerator.png",
					categoryId: "Lorry",
				},
			],
			Diana: [
				{
					nameAr: "دینا ثلاجة مبرد ( 4 طن)",
					nameEn: "Diana Refrigerated (4 tons)",
					sizeAr: "الحجم یصل إلى 4.5 متر",
					sizeEn: "Size up to 4.5 meters",
					image: "/images/truckTypes/Diana/refrigerator.png",
					categoryId: "Diana",
				},
				{
					nameAr: "دینا بونش (3.5 طن)",
					nameEn: "Diana Crane (3.5 tons)",
					sizeAr: "الحجم یصل إلى 4.5 متر",
					sizeEn: "Size up to 4.5 meters",
					image: "/images/truckTypes/Diana/refrigerator.png",
					categoryId: "Diana",
				},
				{
					nameAr: "دینا مجمد (4 طن)",
					nameEn: "Diana Frozen (4 tons)",
					sizeAr: "الحجم یصل إلى 4.5 متر",
					sizeEn: "Size up to 4.5 meters",
					image: "/images/truckTypes/Diana/refrigerator.png",
					categoryId: "Diana",
				},
				{
					nameAr: "دینا صندوق مغلق (4 طن)",
					nameEn: "Diana Closed Box (4 tons)",
					sizeAr: "الحجم یصل إلى 4.5 متر",
					sizeEn: "Size up to 4.5 meters",
					image: "/images/truckTypes/Diana/refrigerator.png",
					categoryId: "Diana",
				},
				{
					nameAr: "دینا جوانب (4 طن)",
					nameEn: "Diana Side (4 tons)",
					sizeAr: "الحجم یصل إلى 4.5 متر",
					sizeEn: "Size up to 4.5 meters",
					image: "/images/truckTypes/Diana/refrigerator.png",
					categoryId: "Diana",
				},
			],
		}),
		[]
	);

	const items = truckTypes[activeCategory] || [];

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 z-50' />
				<Dialog.Content className='fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95vw] max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden'>
					<div className='p-4 border-b border-gray-200 flex items-center justify-between'>
						<Dialog.Title className='text-lg font-bold text-gray-800'>
							{language === "ar" ? "اختر الشاحنة" : "Select Truck"}
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

					{/* Categories */}
					<div className='px-4 py-3 border-b border-gray-200 overflow-x-auto'>
						<div className='flex gap-2'>
							{categories.map((c) => (
								<button
									key={c.id}
									onClick={() => setActiveCategory(c.id)}
									className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
										activeCategory === c.id
											? "border-emerald-400 bg-emerald-50"
											: "border-gray-200 bg-white hover:bg-gray-50"
									}`}>
									<img
										src={c.image}
										alt={c.nameEn}
										className='w-6 h-6 object-contain'
										onError={(e) =>
											((e.target as HTMLImageElement).src = "/placeholder.svg")
										}
									/>
									<span className='text-sm font-semibold text-gray-800'>
										{language === "ar" ? c.nameAr : c.nameEn}
									</span>
								</button>
							))}
						</div>
					</div>

					{/* Items */}
					<div className='p-4 overflow-y-auto max-h-[65vh]'>
						<div className='space-y-2'>
							{items.map((t, idx) => (
								<button
									key={idx}
									onClick={() => onSelect(t)}
									className='w-full text-left flex items-center gap-4 p-3 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors'>
									<div className='w-16 h-16 bg-gray-50 rounded-lg p-2 flex-shrink-0'>
										<img
											src={t.image}
											alt={t.nameEn}
											className='w-full h-full object-contain'
											onError={(e) =>
												((e.target as HTMLImageElement).src =
													"/placeholder.svg")
											}
										/>
									</div>
									<div
										className='flex-1 min-w-0'
										dir={language === "ar" ? "rtl" : "ltr"}>
										<div className='font-bold text-gray-800 truncate'>
											{language === "ar" ? t.nameAr : t.nameEn}
										</div>
										<div className='text-gray-600 text-sm'>
											{language === "ar" ? t.sizeAr : t.sizeEn}
										</div>
									</div>
								</button>
							))}
							{items.length === 0 && (
								<div className='text-center text-gray-500 py-12'>
									{language === "ar" ? "لا توجد شاحنات" : "No trucks available"}
								</div>
							)}
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
