"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/language-context";

interface MapboxInputProps {
	placeholder: string;
	value: string;
	onChange: (value: string, coordinates?: [number, number]) => void;
}

// Placeholder functions for Mapbox API integration
const getMapboxToken = async (): Promise<string> => {
	// In a real implementation, this would fetch the token from your API or environment
	return process.env.REACT_APP_MAPBOX_TOKEN || "";
};

const searchLocation = async (query: string): Promise<any[]> => {
	// In a real implementation, this would use Mapbox Geocoding API
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

const reverseGeocode = async (
	lng: number,
	lat: number
): Promise<string | null> => {
	// In a real implementation, this would use Mapbox Reverse Geocoding API
	try {
		const token = await getMapboxToken();
		if (!token) return null;

		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
		);
		const data = await response.json();
		return data.features?.[0]?.place_name || null;
	} catch (error) {
		console.error("Error reverse geocoding:", error);
		return null;
	}
};

interface MapboxInputProps {
	placeholder: string;
	value: string;
	onChange: (value: string, coordinates?: [number, number]) => void;
}

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
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<any>(null);
	const markerRef = useRef<any>(null);
	const { language } = useLanguage();

	useEffect(() => {
		getMapboxToken().then(setMapboxToken);
	}, []);

	const handleReverseGeocode = useCallback(
		async (lng: number, lat: number) => {
			try {
				const address = await reverseGeocode(lng, lat);
				if (address) {
					setSearchQuery(address);
					onChange(address, [lng, lat]);
				}
			} catch (error) {
				console.error("[v0] Error reverse geocoding:", error);
			}
		},
		[onChange]
	);

	// Initialize Mapbox
	useEffect(() => {
		if (showMap && mapContainerRef.current && !mapRef.current && mapboxToken) {
			// Dynamically import mapbox-gl
			import("mapbox-gl").then((mapboxgl) => {
				mapboxgl.default.accessToken = mapboxToken;

				const map = new mapboxgl.default.Map({
					container: mapContainerRef.current!,
					style: "mapbox://styles/mapbox/streets-v12",
					center: [46.6753, 24.7136], // Riyadh coordinates
					zoom: 11,
				});

				const marker = new mapboxgl.default.Marker({
					draggable: true,
					color: "#10b981",
				})
					.setLngLat([46.6753, 24.7136])
					.addTo(map);

				marker.on("dragend", async () => {
					const lngLat = marker.getLngLat();
					await handleReverseGeocode(lngLat.lng, lngLat.lat);
				});

				map.on("click", async (e: any) => {
					marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
					await handleReverseGeocode(e.lngLat.lng, e.lngLat.lat);
				});

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
	}, [showMap, mapboxToken, handleReverseGeocode]);

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

	const handleConfirm = () => {
		setShowMap(false);
	};

	return (
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
				className={`w-full px-4 py-3 ${
					language === "ar" ? "pr-24" : "pl-24"
				} bg-[#F5F5F5] border border-gray-200 rounded-lg ${
					language === "ar" ? "text-right" : "text-left"
				} focus:outline-none focus:ring-2 focus:ring-[#3BA776] text-gray-700 placeholder-gray-500`}
			/>
			<button
				onClick={() => setShowMap(!showMap)}
				className={`absolute ${
					language === "ar" ? "left-2" : "right-2"
				} top-1/2 -translate-y-1/2 bg-[#3BA776] hover:bg-[#35996B] text-white px-4 py-1.5 rounded-md text-sm transition-colors`}>
				{language === "ar" ? "خريطة" : "Map"}
			</button>

			{/* Suggestions Dropdown */}
			{suggestions.length > 0 && (
				<div className='absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto'>
					{suggestions.map((suggestion, index) => (
						<button
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							className='w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0'>
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

			{isSearching && (
				<div className='absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center text-gray-600'>
					جاري البحث...
				</div>
			)}

			{/* Map Modal */}
			{showMap && (
				<div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in'>
					<div className='bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl'>
						<div className='p-4 border-b border-gray-200 flex items-center justify-between'>
							<h3 className='text-lg font-bold text-gray-800'>
								اختر الموقع على الخريطة
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
						<div ref={mapContainerRef} className='w-full h-[500px]' />
						<div className='p-4 border-t border-gray-200 flex gap-3'>
							<Button
								onClick={handleConfirm}
								className='flex-1 bg-emerald-600 hover:bg-emerald-700'>
								تأكيد الموقع
							</Button>
							<Button
								onClick={() => setShowMap(false)}
								variant='outline'
								className='flex-1'>
								إلغاء
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
