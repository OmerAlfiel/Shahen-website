import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/language-context";

interface MapboxInputProps {
	placeholder: string;
	value: string;
	onChange: (value: string, coordinates?: [number, number]) => void;
}

// Placeholder functions for Mapbox API integration
const getMapboxToken = async (): Promise<string> => {
	return process.env.REACT_APP_MAPBOX_TOKEN || "";
};

const searchLocation = async (query: string): Promise<any[]> => {
	if (!query || query.length < 3) return [];

	try {
		const token = await getMapboxToken();
		if (!token) return [];

		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
				query
			)}.json?access_token=${token}&country=SA&limit=5`
		);
		const data = await response.json();
		return data.features || [];
	} catch (error) {
		console.error("Error searching location:", error);
		return [];
	}
};

export default function MapboxInput({
	placeholder,
	value,
	onChange,
}: MapboxInputProps) {
	const [showMap, setShowMap] = useState(false);
	const [searchQuery, setSearchQuery] = useState(value);
	const [suggestions, setSuggestions] = useState<any[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [mapboxToken, setMapboxToken] = useState<string>("");
	const [mapSearchQuery, setMapSearchQuery] = useState("");
	const [mapSuggestions, setMapSuggestions] = useState<any[]>([]);
	const [isMapSearching, setIsMapSearching] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState<{
		address: string;
		coordinates: [number, number];
	} | null>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<any>(null);
	const markerRef = useRef<any>(null);
	const { language } = useLanguage();

	useEffect(() => {
		getMapboxToken().then(setMapboxToken);
	}, []);

	// Initialize Mapbox
	useEffect(() => {
		if (showMap && mapContainerRef.current && !mapRef.current && mapboxToken) {
			// Dynamically import mapbox-gl
			import("mapbox-gl").then((mapboxgl) => {
				mapboxgl.default.accessToken = mapboxToken;

				const map = new mapboxgl.default.Map({
					container: mapContainerRef.current!,
					style: "mapbox://styles/mapbox/streets-v12",
					center: [46.6753, 24.7136],
					zoom: 11,
				});

				// Create marker but don't make it draggable and don't add click handlers
				const marker = new mapboxgl.default.Marker({
					draggable: false,
					color: "#10b981",
				})
					.setLngLat([46.6753, 24.7136])
					.addTo(map);

				mapRef.current = map;
				markerRef.current = marker;
			});
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [showMap, mapboxToken]);

	const handleSearch = async (query: string) => {
		setIsSearching(true);
		try {
			const results = await searchLocation(query);
			setSuggestions(results);
		} catch (error) {
			console.error("[v0] Error searching location:", error);
			setSuggestions([]);
		} finally {
			setIsSearching(false);
		}
	};

	const handleMapSearch = async (query: string) => {
		setIsMapSearching(true);
		try {
			const results = await searchLocation(query);
			setMapSuggestions(results);
		} catch (error) {
			console.error("[v0] Error searching location in map:", error);
			setMapSuggestions([]);
		} finally {
			setIsMapSearching(false);
		}
	};

	const handleSuggestionClick = (suggestion: any) => {
		const address = suggestion.place_name;
		const coordinates = suggestion.center;
		setSearchQuery(address);
		onChange(address, coordinates);
		setSuggestions([]);

		if (mapRef.current && markerRef.current) {
			mapRef.current.flyTo({ center: coordinates, zoom: 14 });
			markerRef.current.setLngLat(coordinates);
		}
	};

	const handleMapSuggestionClick = (suggestion: any) => {
		const address = suggestion.place_name;
		const coordinates = suggestion.center;
		setSelectedLocation({ address, coordinates });
		setMapSuggestions([]);
		setMapSearchQuery(address);

		if (mapRef.current && markerRef.current) {
			mapRef.current.flyTo({ center: coordinates, zoom: 14 });
			markerRef.current.setLngLat(coordinates);
		}
	};

	const handleConfirm = () => {
		if (selectedLocation) {
			setSearchQuery(selectedLocation.address);
			onChange(selectedLocation.address, selectedLocation.coordinates);
		}
		setShowMap(false);
		setSelectedLocation(null);
		setMapSearchQuery("");
		setMapSuggestions([]);
	};

	return (
		<div className='relative'>
			<div className='relative'>
				<input
					type='text'
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						onChange(e.target.value);
						handleSearch(e.target.value);
					}}
					placeholder={placeholder}
					title={searchQuery}
					className={`w-full h-14 bg-[#F5F5F5] border border-gray-200 rounded-lg ${
						language === "ar" ? "text-right pr-16 pl-3" : "text-left pl-16 pr-3"
					} focus:outline-none focus:ring-2 focus:ring-[#3BA776] text-gray-700 placeholder-gray-500 truncate`}
				/>
				{/* Fade gradient for long text */}
				{searchQuery && searchQuery.length > 20 && (
					<div
						className={`absolute top-0 ${
							language === "ar" ? "left-14" : "right-14"
						} h-full w-6 pointer-events-none`}
						style={{
							background:
								language === "ar"
									? "linear-gradient(to left, #F5F5F5, transparent)"
									: "linear-gradient(to right, #F5F5F5, transparent)",
						}}
					/>
				)}
			</div>
			<button
				onClick={() => setShowMap(!showMap)}
				className={`absolute ${
					language === "ar" ? "left-1" : "right-1"
				} top-1/2 -translate-y-1/2 text-emerald-600 font-semibold text-xs px-3 py-2 hover:bg-emerald-50 rounded transition-colors z-10 bg-white/80 border border-emerald-200`}>
				{language === "ar" ? "خريطة" : "Map"}
			</button>

			{/* Suggestions Dropdown */}
			{suggestions.length > 0 && (
				<div className='absolute z-[60] w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto'>
					{suggestions.map((suggestion, index) => (
						<button
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							className={`w-full px-4 py-3 ${
								language === "ar" ? "text-right" : "text-left"
							} hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0`}>
							<div
								className={`flex items-start gap-2 ${
									language === "ar" ? "flex-row-reverse" : ""
								}`}>
								<svg
									className='w-4 h-4 text-emerald-600 mt-1 flex-shrink-0'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
									/>
								</svg>
								<span className='text-sm text-gray-700'>
									{suggestion.place_name}
								</span>
							</div>
						</button>
					))}
				</div>
			)}

			{isSearching && (
				<div
					className={`absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-600 ${
						language === "ar" ? "text-right" : "text-left"
					}`}>
					{language === "ar" ? "جاري البحث..." : "Searching..."}
				</div>
			)}

			{/* Map Modal */}
			{showMap && (
				<div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in'>
					<div className='bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl'>
						<div className='p-4 border-b border-gray-200 flex items-center justify-between'>
							<h3 className='text-lg font-bold text-gray-800'>
								{language === "ar"
									? "البحث عن موقع على الخريطة"
									: "Search for location on map"}
							</h3>
							<button
								onClick={() => setShowMap(false)}
								className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
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
							</button>
						</div>

						{/* Search input inside map */}
						<div className='p-4 border-b border-gray-200'>
							<div className='relative'>
								<input
									type='text'
									value={mapSearchQuery}
									onChange={(e) => {
										setMapSearchQuery(e.target.value);
										handleMapSearch(e.target.value);
									}}
									placeholder={
										language === "ar"
											? "ابحث عن موقع..."
											: "Search for a location..."
									}
									className={`w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg ${
										language === "ar" ? "text-right" : "text-left"
									} focus:outline-none focus:ring-2 focus:ring-[#3BA776] text-gray-700 placeholder-gray-500`}
								/>

								{/* Map Suggestions Dropdown */}
								{mapSuggestions.length > 0 && (
									<div className='absolute z-[70] w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-48 overflow-y-auto'>
										{mapSuggestions.map((suggestion, index) => (
											<button
												key={index}
												onClick={() => handleMapSuggestionClick(suggestion)}
												className={`w-full px-4 py-3 ${
													language === "ar" ? "text-right" : "text-left"
												} hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0`}>
												<div className='flex items-start gap-2'>
													<svg
														className='w-4 h-4 text-emerald-600 mt-1 flex-shrink-0'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
														/>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
														/>
													</svg>
													<span className='text-sm text-gray-700'>
														{suggestion.place_name}
													</span>
												</div>
											</button>
										))}
									</div>
								)}

								{isMapSearching && (
									<div className='absolute z-[70] w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-600'>
										{language === "ar" ? "جاري البحث..." : "Searching..."}
									</div>
								)}
							</div>
						</div>

						<div ref={mapContainerRef} className='w-full h-[400px]' />
						<div className='p-4 border-t border-gray-200 flex gap-3'>
							{selectedLocation && (
								<Button
									onClick={handleConfirm}
									className='flex-1 bg-emerald-600 hover:bg-emerald-700'>
									{language === "ar" ? "تأكيد الموقع" : "Confirm Location"}
								</Button>
							)}
							<Button
								onClick={() => {
									setShowMap(false);
									setSelectedLocation(null);
									setMapSearchQuery("");
									setMapSuggestions([]);
								}}
								variant='outline'
								className='flex-1'>
								{language === "ar" ? "إلغاء" : "Cancel"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
