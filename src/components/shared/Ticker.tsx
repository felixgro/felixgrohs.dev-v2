import { h, Ref, FunctionalComponent } from 'preact';
import TickerDebugger from '@/components/shared/TickerDebugger';
import { useState, useEffect, useRef, useLayoutEffect } from 'preact/hooks';
import useAnimationFrame from '@/hooks/useAnimationFrame';
import useWindowSize from '@/hooks/useWindowSize';
import style from '#/ProjectTicker.css';
import useElementSize from '@/hooks/useElementSize';

export type TickerState = 'idle' | 'scrolling' | 'paused' | 'centering';

interface TickerProps {
	state: TickerState; // current state of the ticker
	speed?: number; // automatic scrolling speed
	centeringSpeed?: number; // speed of centering the clicked project
	centeringEase?: string; // easing function for centering
	centeringDurationMax?: number; // max duration of centering the clicked project (can increase specified centeringSpeed)
	marginFactor?: number; // overlapping distance factor for both sides of the screen
	marginMin?: number; // minimum overlapping distance for mobile
	debug?: boolean; // show debugging info
}

const defaultProps = {
	speed: 1,
	centeringSpeed: 0.8,
	centeringEase: 'ease-out',
	centeringDurationMax: 500,
	marginFactor: 1.5,
	marginMin: 600,
};

const Ticker: FunctionalComponent<TickerProps> = ({ children: child, ...props }) => {
	const [scrollPos, setScrollPos] = useState(0);
	const [childCount, setChildCount] = useState(1);

	const childRefs = useRef<HTMLDivElement[]>([]);
	const viewRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const windowSize = useWindowSize();
	const viewSize = useElementSize(viewRef, [windowSize.width]);
	const wrapperSize = useElementSize(wrapperRef, [childCount]);

	useEffect(() => {
		if (childCount === 1) return;
		setScrollPos(wrapperSize.width / 2 - viewSize.width / 2);
	}, [wrapperSize, viewSize]);

	useLayoutEffect(() => {
		if (viewSize.width === 0) return;
		const childWidth = childRefs.current[0]?.clientWidth ?? Number.POSITIVE_INFINITY;
		let margin = viewSize.width * (props.marginFactor ?? defaultProps.marginFactor);
		let count = 0;

		for (let w = 0; w < viewSize.width + 2 * margin; w += childWidth) {
			count++;
		}

		if (count < 2) count = 2;

		setChildCount(count);
	}, [viewSize, childRefs]);

	return (
		<div
			class={style.projectTicker}
			ref={viewRef}
			aria-hidden="true"
			onClick={(e) => {
				console.log(e);
			}}
		>
			<TickerDebugger state={props.state} />
			<div
				ref={wrapperRef}
				class={style.projectContainerWrapper}
				style={{
					transform: `translateX(${scrollPos * -1}px)`,
				}}
			>
				{Array.from({ length: childCount }).map((_, i) => (
					<div
						key={i}
						ref={(r) => {
							if (!r) return;
							childRefs.current = [...childRefs.current, r];
						}}
					>
						{child}
					</div>
				))}
			</div>
		</div>
	);
};

export default Ticker;
