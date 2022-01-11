import { h, FunctionalComponent } from 'preact';
import {
	useRef,
	useMemo,
	useState,
	useEffect,
	useCallback,
	useLayoutEffect,
	StateUpdater,
} from 'preact/hooks';
import useWindowSize from '@/hooks/useWindowSize';
import useBcr from '@/hooks/useElementSize';
import Repeat from '@/components/shared/Repeat';
import { insertAfter } from '@/utils/dom';
import style from './style.css';

export interface TickerProps {
	scroll: number;
	setScroll?: StateUpdater<number>;
	marginFactor?: number; // overlapping distance factor for both sides of the screen
}

// This component should receive a single child, which get's cloned to satisfy all
// specified margin properties. Then it automatically swaps components based on the
// current scroll position to create an infinite scrolling effect in a memory safe fashion.
const Ticker: FunctionalComponent<TickerProps> = ({ children: child, ...props }) => {
	const [childCount, setChildCount] = useState(1);

	const viewRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);
	const indicatorStartRef = useRef<HTMLSpanElement>(null);
	const indicatorEndRef = useRef<HTMLSpanElement>(null);

	const windowSize = useWindowSize();

	const viewRect = useBcr(viewRef, [windowSize.width]);
	const wrapperRect = useBcr(wrapperRef, [childCount]);
	const childRect = useBcr(childRef, []);

	const margin = useMemo(() => {
		return viewRect.width * props.marginFactor!;
	}, [viewRect.width, props.marginFactor]);

	// Moves an existing child either from the start to the end or vice versa
	// depending on the current scroll position. This results in an infinite scrolling effect.
	// Each child is getting recycled (rather then cloned and removed) to avoid memory leaks.
	const moveContainerTo = useCallback(
		(dir: 'start' | 'end') => {
			const containerIndex = dir === 'start' ? wrapperRef.current!.children.length - 2 : 1;
			const container = wrapperRef.current!.removeChild(
				wrapperRef.current?.children[containerIndex]!
			);

			props.setScroll?.((s) => {
				if (dir === 'start') {
					insertAfter(container, indicatorStartRef.current!);
					return s + childRect.width;
				} else if (dir === 'end') {
					wrapperRef.current!.insertBefore(container, indicatorEndRef.current!);
					return s - childRect.width;
				} else {
					throw new Error('Invalid container direction');
				}
			});
		},
		[childRect.width, wrapperRef]
	);

	// Calculates the number of child clones to inject
	// into the wrapperbased on specified marginFactor.
	useLayoutEffect(() => {
		if (viewRect.width === 0) return;
		const childAmount = Math.ceil((viewRect.width + 2 * margin) / childRect.width);
		setChildCount(Math.max(childAmount, 2));
	}, [viewRect, childRect.width, margin]);

	// center view each time the width changes
	useEffect(() => {
		if (wrapperRect.width === childRect.width) return;
		props.setScroll?.(wrapperRect.width / 2 - childRect.width / 2);
	}, [wrapperRect.width, childRect.width]);

	// apply scroll position to wrapper element for the visual animation
	useEffect(() => {
		wrapperRef.current?.style.setProperty(`transform`, `translateX(${props.scroll * -1}px)`);
	}, [props.scroll]);

	// observe start and end indicators and swap children accordingly
	// to create infinite scrolling effect in both directions
	useEffect(() => {
		if (viewRect.width === 0) return;

		const observerCallback: IntersectionObserverCallback = (entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const target = entry.target as HTMLSpanElement;
				const dir = target.dataset.indicates;
				moveContainerTo(dir as 'start' | 'end');
			}
		};

		const observer = new IntersectionObserver(observerCallback, {
			root: viewRef.current,
			rootMargin: `${margin / 2}px`,
		});

		observer.observe(indicatorStartRef.current!);
		observer.observe(indicatorEndRef.current!);

		return () => observer.disconnect();
	}, [margin]);

	return (
		<div ref={viewRef} class={style.view}>
			<div ref={wrapperRef} class={style.wrapper}>
				<span ref={indicatorStartRef} data-indicates="start"></span>
				<Repeat amount={childCount}>
					{(idx) => (
						<span key={idx} ref={childRef}>
							{child}
						</span>
					)}
				</Repeat>
				<span ref={indicatorEndRef} data-indicates="end"></span>
			</div>
		</div>
	);
};

Ticker.defaultProps = {
	marginFactor: 0.5,
};

export default Ticker;
