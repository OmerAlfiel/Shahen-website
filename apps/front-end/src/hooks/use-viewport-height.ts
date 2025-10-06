import { useEffect } from "react";

/**
 * Sets a CSS variable --vh equal to 1% of the visual viewport height.
 * This avoids mobile 100vh jumps when dynamic toolbars appear/disappear
 * and when media inside sections finishes loading causing reflow.
 *
 * Usage: in CSS use height: calc(var(--vh, 1vh) * 100);
 */
export default function useViewportHeight() {
	useEffect(() => {
		function setVH() {
			// Use visualViewport when available to get dynamic height excluding overlays
			const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}

		setVH();
		window.addEventListener("resize", setVH);
		window.visualViewport?.addEventListener("resize", setVH);
		window.addEventListener("orientationchange", setVH);

		return () => {
			window.removeEventListener("resize", setVH);
			window.visualViewport?.removeEventListener("resize", setVH);
			window.removeEventListener("orientationchange", setVH);
		};
	}, []);
}
