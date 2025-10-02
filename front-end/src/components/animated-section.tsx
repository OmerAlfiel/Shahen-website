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

	return (
		<div
			ref={targetRef}
			className={`${className} ${
				hasIntersected ? `animate-${animation}` : "opacity-0"
			}`}
			style={{
				animationDelay: `${delay}ms`,
			}}>
			{children}
		</div>
	);
}
