import { h, FunctionalComponent, RefCallback } from 'preact';
import Repeat from '@/components/shared/Repeat';
import useWindowSize from '@/hooks/useWindowSize';
import style from '#/ProjectTicker.css';
import useElementSize from '@/hooks/useElementSize';
import { useState, useEffect, useRef, useLayoutEffect, useMemo, StateUpdater } from 'preact/hooks';

export type TickerState = 'idle' | 'scrolling' | 'paused' | 'centering';

export interface TickerProps {
	scroll: number;
	setScroll?: StateUpdater<number>;
	speed?: number; // automatic scrolling speed
	centeringSpeed?: number; // speed of centering the clicked project
	centeringEase?: string; // easing function for centering
	centeringDurationMax?: number; // max duration of centering the clicked project (can increase specified centeringSpeed)
	marginFactor?: number; // overlapping distance factor for both sides of the screen
	marginMin?: number; // minimum overlapping distance for mobile
	debug?: boolean; // show debugging info
}

const Ticker: FunctionalComponent<TickerProps> = ({ children: child, ...props }) => {
	const [childCount, setChildCount] = useState(1);
	const childRefs = useRef<HTMLDivElement[]>([]);
	const viewRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const windowSize = useWindowSize();
	const viewSize = useElementSize(viewRef, [windowSize.width]);
	const wrapperSize = useElementSize(wrapperRef, [childCount]);
	const childSize = useElementSize(childRefs);

	const translateX = useMemo(() => {
		return { transform: `translateX(${props.scroll * -1}px)` };
	}, [props.scroll]);

	const assignChildRef: RefCallback<HTMLDivElement> = (ref): void => {
		if (!ref) return;
		childRefs.current = [...childRefs.current, ref];
	};

	useEffect(() => {
		if (!props.scroll) return;
		// console.log(props.scroll);
	}, [props.scroll]);

	useLayoutEffect(() => {
		if (viewSize.width === 0 || !childRefs.current[0]) return;
		const childWidth = childRefs.current[0].clientWidth;
		const margin = viewSize.width * props.marginFactor!;
		let count = 0;

		for (let w = 0; w < viewSize.width + 2 * margin; w += childWidth) count++;
		if (count < 2) count = 2;

		setChildCount(count);
		props.setScroll?.(wrapperSize.width / 2 - viewSize.width / 2);
	}, [viewSize, childRefs]);

	return (
		<div ref={viewRef} style={{ overflowX: 'hidden' }}>
			<div
				ref={wrapperRef}
				style={{
					position: 'relative',
					display: 'flex',
					width: 'max-content',
					willChange: 'transform',
					...translateX,
				}}
			>
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
