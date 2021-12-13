import { h, FunctionalComponent } from 'preact';
import { useState, useMemo, useEffect, useRef, useCallback } from 'preact/hooks';

const focusConfig = {
	duration: 240,
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
	const indicatorRef = useRef<HTMLDivElement>(null);
	const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
	const lastTab = useRef<number>(0);
	const eventState = useRef<FocusEventState>({
		keyboard: false,
		focus: false,
		tId: null,
	});

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
			const targetBcr = focusedElement.getBoundingClientRect();
			const parentBcr = indicatorRef.current.parentElement!.getBoundingClientRect();

			const x = targetBcr.left - parentBcr.left - focusConfig.paddingX;
			const y = targetBcr.top - parentBcr.top - focusConfig.paddingY;
			const width = targetBcr.width + focusConfig.paddingX * 2;
			const height = targetBcr.height + focusConfig.paddingY * 2;

			indicatorRef.current.style.display = 'block';
			if (!shouldAnimate) {
				indicatorRef.current.style.transform = `translate(${x}px, ${y}px)`;
				indicatorRef.current.style.width = `${width}px`;
				indicatorRef.current.style.height = `${height}px`;
				return;
			}

			indicatorRef.current?.animate(
				[
					{
						height: `${height}px`,
						width: `${width}px`,
						transform: `translate(${x}px, ${y}px)`,
					},
				],
				{
					duration: focusConfig.duration,
					easing: 'ease-out',
					fill: 'forwards',
				}
			);
		},
		[indicatorRef.current, focusedElement]
	);

	const animateFocus = useCallback(() => {
		if (!indicatorRef.current || !focusedElement) return;
		const targetBcr = focusedElement.getBoundingClientRect();
		const parentBcr = indicatorRef.current.parentElement!.getBoundingClientRect();

		const x = targetBcr.left - parentBcr.left - focusConfig.paddingX;
		const y = targetBcr.top - parentBcr.top - focusConfig.paddingY;
		const width = targetBcr.width + focusConfig.paddingX * 2;
		const height = targetBcr.height + focusConfig.paddingY * 2;

		indicatorRef.current?.animate(
			[
				{
					height: `${height}px`,
					width: `${width}px`,
					transform: `translate(${x}px, ${y}px)`,
				},
			],
			{
				duration: focusConfig.duration,
				easing: 'ease-out',
				fill: 'forwards',
			}
		);
	}, [indicatorRef.current, focusedElement]);

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
			if (eventState.current.keyboard && isValidFocusTarget(target)) {
				setFocusedElement(target);
			}
		},
		[eventState.current.keyboard]
	);

	const keyDownHandler = useCallback((e: KeyboardEvent) => {
		if (e.metaKey || e.ctrlKey || e.altKey || e.code !== 'Tab') {
			return;
		}
		eventState.current.keyboard = true;
		lastTab.current = e.timeStamp;
	}, []);

	const abortKeyboardFocus = useCallback(() => {
		eventState.current.keyboard = false;
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
			document.removeEventListener('keydown', keyDownHandler);
			document.removeEventListener('focusin', focusInHandler);
			document.removeEventListener('focusout', focusOutHandler);
		};
	}, []);

	return (
		<div
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
