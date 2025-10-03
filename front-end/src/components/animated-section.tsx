import React, { ReactNode } from "react";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";

interface AnimatedSectionProps {
	children: ReactNode;
	animation?: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right";
	delay?: number;
	className?: string;
}

export default function AnimatedSection({
	children,
	animation = "fade-in",
	delay = 0,
	className = "",
}: AnimatedSectionProps) {
	const { targetRef, hasIntersected } = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	const getInitialTransform = (animationType: string) => {
		switch (animationType) {
			case "slide-in-left":
				return "translate-x-[-30px]";
			case "slide-in-right":
				return "translate-x-[30px]";
			case "slide-up":
				return "translate-y-[30px]";
			default:
				return "translate-y-[20px]";
		}
	};

	return (
		<div
			ref={targetRef}
			className={`${className} transition-all duration-700 ease-out ${
				hasIntersected
					? "opacity-100 translate-x-0 translate-y-0"
					: `opacity-0 ${getInitialTransform(animation)}`
			}`}
			style={{
				transitionDelay: delay > 0 ? `${delay}ms` : "0ms",
			}}>
			{children}
		</div>
	);
}
