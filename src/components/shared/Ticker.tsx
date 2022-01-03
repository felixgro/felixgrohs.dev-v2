import { h, FunctionalComponent, RefCallback } from 'preact';
import { useState, useEffect, useRef, useLayoutEffect, StateUpdater } from 'preact/hooks';
import useWindowSize from '@/hooks/useWindowSize';
import useBcr from '@/hooks/useElementSize';
import Repeat from '@/components/shared/Repeat';
import style from '#/Ticker.css';

export interface TickerProps {
	scroll: number;
	setScroll?: StateUpdater<number>;
	marginFactor?: number; // overlapping distance factor for both sides of the screen
	marginMin?: number; // minimum overlapping distance for mobile
}

// This component should receive a single child, which get's cloned to satisfy all
// specified margin properties. Then it automatically swaps components based on the
// current scroll position to create an infinite scrolling effect in a memory safe fashion.
const Ticker: FunctionalComponent<TickerProps> = ({ children: child, ...props }) => {
	const [childCount, setChildCount] = useState(1);

	const windowSize = useWindowSize();

	const viewRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const childRefs = useRef<HTMLDivElement[]>([]);

	const viewRect = useBcr(viewRef, [windowSize.width]);
	const wrapperRect = useBcr(wrapperRef, [childCount, props.scroll]);
	const childRect = useBcr(childRefs);

	// Keep a reference to all children within the wrapper
	const assignChildRef: RefCallback<HTMLDivElement> = (ref): void => {
		if (!ref) return;
		childRefs.current = [...childRefs.current, ref];
	};

	const appendContainer = () => {
		// if (!wrapperRef.current?.firstChild) return;
		// const firstContainer = wrapperRef.current?.removeChild(wrapperRef.current?.firstChild);
		// if (firstContainer) {
		// 	wrapperRef.current?.appendChild(firstContainer);
		// }
	};

	const prependContainer = () => {};

	// When first initialized, the wrapper gets only one child in order
	// to calculate it's width from within a layout effect, which will
	// inject more children (>1) into the wrapper when done.
	useEffect(() => {
		if (wrapperRect.width === childRect.width) return;
		props.setScroll?.(wrapperRect.width / 2 - childRect.width / 2);
	}, [wrapperRect.width, childRect.width]);

	// Renders current scroll position on dom if wrapper exists.
	useEffect(() => {
		wrapperRef.current?.style.setProperty(`transform`, `translateX(${props.scroll * -1}px)`);

		const distanceToEnd = wrapperRect.x + wrapperRect.width - viewRect.width - viewRect.x;

		if (distanceToEnd < viewRect.width * props.marginFactor!) {
			appendContainer();
		}
	}, [props.scroll]);

	// Calculates the number of children to inject into the wrapper
	// based on specified marginFactor and marginMin.
	useLayoutEffect(() => {
		if (viewRect.width === 0 || !childRefs.current[0]) return;
		const childWidth = childRefs.current[0].clientWidth;
		const margin = viewRect.width * props.marginFactor!;
		const amount = Math.ceil((viewRect.width + 2 * margin) / childWidth);
		setChildCount(Math.max(amount, 2));
	}, [viewRect, childRefs]);

	return (
		<div ref={viewRef} class={style.view}>
			<div ref={wrapperRef} class={style.wrapper}>
				<Repeat amount={childCount}>
					{(idx) => (
						<div key={idx} ref={assignChildRef}>
							{child}
						</div>
					)}
				</Repeat>
			</div>
		</div>
	);
};

Ticker.defaultProps = {
	marginMin: 600,
	marginFactor: 1.5,
};

export default Ticker;
