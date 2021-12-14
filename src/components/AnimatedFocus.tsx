import { h, FunctionalComponent } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';

const focusConfig = {
	duration: 160,
	paddingX: 10,
	paddingY: 10,
};

interface FocusProps {}

interface FocusEventState {
	keyboard: boolean;
	focus: boolean;
	tId: number | null;
}

const AnimatedFocus: FunctionalComponent<FocusProps> = ({}) => {
	const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const usedKey = useRef(false);

	const isValidFocusTarget = useCallback((el: Element | Node): boolean => {
		if (
			el &&
			el !== document &&
			el.nodeName !== 'HTML' &&
			el.nodeName !== 'BODY' &&
			'focus' in el
		) {
			return true;
		}
		return false;
	}, []);

	const setFocus = useCallback(
		(shouldAnimate: boolean) => {
			if (!indicatorRef.current || !focusedElement) return;

			const targetBcr = focusedElement.getBoundingClientRect(),
				parentBcr = indicatorRef.current.parentElement!.getBoundingClientRect(),
				x = targetBcr.left - parentBcr.left - focusConfig.paddingX,
				y = targetBcr.top - parentBcr.top - focusConfig.paddingY,
				width = targetBcr.width + focusConfig.paddingX * 2,
				height = targetBcr.height + focusConfig.paddingY * 2;

			indicatorRef.current.style.display = 'block';

			indicatorRef.current
				?.animate(
					[
						{
							height: `${height}px`,
							width: `${width}px`,
							transform: `translate(${x}px, ${y}px)`,
						},
					],
					{
						duration: shouldAnimate ? focusConfig.duration : 0,
						easing: 'ease-out',
					}
				)
				.addEventListener('finish', () => {
					if (!indicatorRef.current) return;
					indicatorRef.current.style.transform = `translate(${x}px, ${y}px)`;
					indicatorRef.current.style.width = `${width}px`;
					indicatorRef.current.style.height = `${height}px`;
				});
		},
		[indicatorRef.current, focusedElement]
	);

	const focusOutHandler = useCallback((e: FocusEvent) => {
		if (!e.relatedTarget && indicatorRef.current) {
			setFocusedElement(null);
			Object.assign(indicatorRef.current.style, {
				display: 'none',
				height: 0,
				width: 0,
				transform: 'translateX(0) translateY(0)',
			});
		}
	}, []);

	const focusInHandler = useCallback(
		(e: FocusEvent) => {
			const target = e.target as HTMLElement;
			if (usedKey.current && isValidFocusTarget(target)) {
				setFocusedElement(target);
			}
		},
		[usedKey.current]
	);

	const keyDownHandler = useCallback((e: KeyboardEvent) => {
		if (e.metaKey || e.ctrlKey || e.altKey) {
			return;
		}
		usedKey.current = true;
	}, []);

	const abortKeyboardFocus = useCallback(() => {
		usedKey.current = false;
	}, []);

	useEffect(() => {
		if (!focusedElement || !indicatorRef.current) {
			return;
		}

		const shouldAnimate = indicatorRef.current.style.display !== 'none';
		setFocus(shouldAnimate);
	}, [focusedElement]);

	useEffect(() => {
		document.addEventListener('click', abortKeyboardFocus);
		document.addEventListener('touchstart', abortKeyboardFocus);
		document.addEventListener('touchmove', abortKeyboardFocus);
		document.addEventListener('keydown', keyDownHandler);
		document.addEventListener('focusin', focusInHandler);
		document.addEventListener('focusout', focusOutHandler);
		return () => {
			document.removeEventListener('click', abortKeyboardFocus);
			document.removeEventListener('touchstart', abortKeyboardFocus);
			document.removeEventListener('touchmove', abortKeyboardFocus);
			document.removeEventListener('keydown', keyDownHandler);
			document.removeEventListener('focusin', focusInHandler);
			document.removeEventListener('focusout', focusOutHandler);
		};
	}, []);

	return (
		<div
			aria-hidden={true}
			style={{
				position: 'absolute',
				pointerEvents: 'none',
				inset: 0,
				zIndex: 10000,
			}}
		>
			<div
				ref={indicatorRef}
				style={{
					position: 'absolute',
					border: '3px solid red',
					borderRadius: '10px',
					display: 'none',
					willChange: 'transform, width, height',
				}}
			></div>
		</div>
	);
};

export default AnimatedFocus;
