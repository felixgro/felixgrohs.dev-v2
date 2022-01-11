import { h, FunctionalComponent, Fragment } from 'preact';
import { useState, useEffect, useRef, useCallback, useMemo } from 'preact/hooks';
import useWindowSize from '@/hooks/useWindowSize';
import style from './style.css';

interface AnimatedFocusProps {
	paddingX?: number;
	paddingY?: number;
	duration?: number;
	easing?: string;
}

interface FocusRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

const isSupported = () => typeof window !== 'undefined' && 'animate' in HTMLElement.prototype;

const AnimatedFocus: FunctionalComponent<AnimatedFocusProps> = (props) => {
	if (!isSupported()) return <></>;
	const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const usedKey = useRef(false);
	const { width } = useWindowSize();

	const focusRect = useMemo<FocusRect | null>(() => {
		if (!focusedElement) return null;
		const targetBcr = focusedElement.getBoundingClientRect(),
			parentBcr = wrapperRef.current!.getBoundingClientRect();

		return {
			x: targetBcr.left - parentBcr.left - props.paddingX!,
			y: targetBcr.top - parentBcr.top - props.paddingY!,
			width: targetBcr.width + props.paddingX! * 2,
			height: targetBcr.height + props.paddingY! * 2,
		};
	}, [focusedElement, width]);

	const isValidFocusTarget = useCallback((target: EventTarget | null): boolean => {
		const el = target as any;
		return (
			el &&
			el !== document &&
			el.nodeName !== 'HTML' &&
			el.nodeName !== 'BODY' &&
			'focus' in el
		);
	}, []);

	const positionateIndicator = useCallback((rect: FocusRect) => {
		if (!indicatorRef.current?.style) return;
		Object.assign(indicatorRef.current.style, {
			width: `${rect.width}px`,
			height: `${rect.height}px`,
			transform: `translate(${rect.x}px, ${rect.y}px)`,
		});
	}, []);

	const focusInHandler = useCallback((e: FocusEvent) => {
		if (!isValidFocusTarget(e.target) || !usedKey.current) return;
		setFocusedElement(e.target as HTMLElement);
	}, []);

	const focusOutHandler = useCallback((e: FocusEvent) => {
		if (e.relatedTarget || !indicatorRef.current) return;
		setFocusedElement(null);
		indicatorRef.current.classList.add(style.hidden);
	}, []);

	const keyDownHandler = useCallback((e: KeyboardEvent) => {
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		usedKey.current = true;
	}, []);

	const abortKeyboardFocus = () => (usedKey.current = false);

	useEffect(() => {
		if (!focusRect || !indicatorRef.current) return;
		const shouldAnimate = !indicatorRef.current.classList.contains(style.hidden);

		const transformTo = {
			height: `${focusRect.height}px`,
			width: `${focusRect.width}px`,
			transform: `translate(${focusRect.x}px, ${focusRect.y}px)`,
		};

		indicatorRef.current
			.animate([transformTo], {
				duration: shouldAnimate ? props.duration! : 0,
				easing: shouldAnimate ? props.easing! : 'linear',
			})
			.addEventListener('finish', () => positionateIndicator(focusRect));

		if (!shouldAnimate) {
			indicatorRef.current.classList.remove(style.hidden);
		}
	}, [focusRect]);

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
		<div ref={wrapperRef} class={style.wrapper} aria-hidden={true}>
			<div ref={indicatorRef} class={`${style.indicator} ${style.hidden}`}></div>
		</div>
	);
};

AnimatedFocus.defaultProps = {
	paddingX: 10,
	paddingY: 10,
	duration: 160,
	easing: 'ease-out',
};

export default AnimatedFocus;
