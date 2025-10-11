"use client";

import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";

interface AnimatedSectionProps {
	children: ReactNode;
	animation?: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right";
	delay?: number;
	className?: string;
	initiallyVisible?: boolean;
	enableFallback?: boolean;
	fallbackDelay?: number;
}

export default function AnimatedSection({
	children,
	animation = "fade-in",
	delay = 0,
	className = "",
	initiallyVisible = false,
	enableFallback = true,
	fallbackDelay = 650,
}: AnimatedSectionProps) {
	const { targetRef, hasIntersected } = useIntersectionObserver({
		threshold: 0.05,
		triggerOnce: true,
	});

	// Local override state to force visibility (fallback or initial)
	const [forcedVisible, setForcedVisible] = useState(initiallyVisible);

	// If initiallyVisible changes dynamically (rare), reflect it
	useEffect(() => {
		if (initiallyVisible) setForcedVisible(true);
	}, [initiallyVisible]);

	useEffect(() => {
		if (!enableFallback || forcedVisible) return;
		if (hasIntersected) return;
		const id = window.setTimeout(() => {
			if (!targetRef.current || hasIntersected) return;
			const rect = targetRef.current.getBoundingClientRect();
			const vh = window.visualViewport?.height || window.innerHeight;
			const inViewport = rect.top < vh && rect.bottom > 0;
			if (inViewport) {
				setForcedVisible(true);
			}
		}, fallbackDelay);
		return () => window.clearTimeout(id);
	}, [enableFallback, fallbackDelay, hasIntersected, forcedVisible, targetRef]);

	// Layout effect: if above-the-fold (initial render within viewport) mark as visible quickly to avoid first-scroll jump
	useLayoutEffect(() => {
		if (forcedVisible || hasIntersected) return;
		const el = targetRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const vh = window.visualViewport?.height || window.innerHeight;
		if (rect.top < vh * 0.9) {
			// close enough to viewport on first paint
			setForcedVisible(true);
		}
	}, [forcedVisible, hasIntersected, targetRef]);

	const getInitialTransform = (animationType: string) => {
		switch (animationType) {
			case "slide-in-left":
				return "-translate-x-8";
			case "slide-in-right":
				return "translate-x-8";
			case "slide-up":
				return "translate-y-8";
			default:
				return "translate-y-5";
		}
	};

	const visible = forcedVisible || hasIntersected;

	return (
		<div
			ref={targetRef}
			className={[
				className,

				"transition duration-700 ease-out will-change-transform will-change-opacity",
				visible
					? "opacity-100 translate-x-0 translate-y-0"
					: `opacity-0 ${getInitialTransform(animation)}`,
				"transform-gpu",
			].join(" ")}
			style={{ transitionDelay: delay > 0 ? `${delay}ms` : "0ms" }}>
			{children}
		</div>
	);
}
