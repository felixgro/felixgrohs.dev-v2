import { h, FunctionalComponent, Fragment } from 'preact';
import { useState, useEffect, useCallback, useRef, useMemo } from 'preact/hooks';
import useAnimationFrame from '../../hooks/useAnimationFrame';
import useWindowSize from '../../hooks/useWindowSize';
import ProjectItem, { Project } from './ProjectItem';
import style from './style.css';

const tickerConfig = {
	speed: 1, // automatic scrolling speed
	centeringSpeed: 0.8, // speed of centering the clicked project
	centeringDurationMax: 500, // max duration of centering the clicked project (can increase specified centeringSpeed)
	centeringEase: 'ease-out', // easing function for centering
	marginFactor: 1.5, // overlapping distance factor for both sides of the screen
	marginMin: 600, // minimum overlapping distance for mobile
};

export type TickerState = 'idle' | 'scrolling' | 'paused' | 'centering';

type TickerProps = {
	state: TickerState;
	projects: Project[];
	onProjectClicked?: (project: Project, element: HTMLElement) => void;
	onProjectCentered?: (project: Project, element: HTMLElement) => void;
};

const ProjectTicker: FunctionalComponent<TickerProps> = ({
	state,
	projects,
	onProjectClicked,
	onProjectCentered,
}) => {
	const [scrollPos, setScrollPos] = useState(0);
	const tickerRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const windowSize = useWindowSize();

	const getBcrs = useCallback(() => {
		return {
			view: tickerRef.current?.getBoundingClientRect(),
			wrapper: wrapperRef.current?.getBoundingClientRect(),
			container: wrapperRef.current?.children[0]?.getBoundingClientRect(),
		};
	}, [tickerRef.current, wrapperRef.current, windowSize]);

	const tickerAnimation = useAnimationFrame(() => {
		if (state !== 'scrolling') return;
		const { view, wrapper, container } = getBcrs();
		if (!view || !wrapper || !container) return;

		setScrollPos((curr) => {
			if (wrapper.width - curr - view.width < view.width * tickerConfig.marginFactor * 0.5) {
				appendContainer();
				return curr - container.width;
			}
			return curr + tickerConfig.speed;
		});
	});

	const projectClickHandler = useCallback(
		(project: Project, el: HTMLElement) => {
			onProjectClicked?.(project, el);
			const itemBcr = el.getBoundingClientRect();
			const tickerBcr = tickerRef.current!.getBoundingClientRect();
			const diff = itemBcr.x + itemBcr.width / 2 - (tickerBcr.x + tickerBcr.width / 2);
			let duration = Math.abs(diff / tickerConfig.centeringSpeed);
			if (duration > tickerConfig.centeringDurationMax) {
				duration = tickerConfig.centeringDurationMax;
			}

			const currentX =
				parseFloat(wrapperRef.current!.style.transform.replace(/[^\d.]/g, '')) * -1;

			wrapperRef
				.current!.animate(
					[
						{ transform: `translateX(${currentX}px)` },
						{ transform: `translateX(${currentX - diff}px)` },
					],
					{
						easing: tickerConfig.centeringEase,
						duration,
					}
				)
				.addEventListener('finish', () => {
					animationCleanup(diff);
					onProjectCentered?.(project, el);
				});
		},
		[wrapperRef.current]
	);

	const createProjectContainer = useCallback(() => {
		return (
			<div class={style.projectContainer}>
				{projects.map((project) => (
					<ProjectItem project={project} onClick={projectClickHandler} />
				))}
			</div>
		);
	}, [projects]);

	const projectContainers = useMemo(() => {
		const { container, view } = getBcrs();

		// only insert one container first, to get the correct width
		// and then insert the rest of the containers immediately
		if (!container || !view) {
			return createProjectContainer();
		}

		const containers = [];
		let margin = view.width * tickerConfig.marginFactor;
		if (margin < tickerConfig.marginMin) {
			margin = tickerConfig.marginMin;
		}
		for (let w = 0; w < view.width + 2 * margin; w += container.width) {
			containers.push(createProjectContainer());
		}
		return containers;
	}, [projects, getBcrs]);

	// moves first container all the way to the right as the new trailing container
	// this container recycling is done to prevent the browser from creating new DOM nodes
	const appendContainer = useCallback(() => {
		if (!wrapperRef.current?.firstChild) return;
		const firstContainer = wrapperRef.current?.removeChild(wrapperRef.current?.firstChild);
		if (firstContainer) {
			wrapperRef.current?.appendChild(firstContainer);
		}
	}, []);

	const prependContainer = useCallback(() => {
		const lastContainer = wrapperRef.current?.removeChild(wrapperRef.current?.lastChild!);
		if (lastContainer) {
			wrapperRef.current?.insertBefore(lastContainer, wrapperRef.current?.firstChild);
		}
	}, []);

	const animationCleanup = useCallback(
		(diff: number) => {
			let res = 0;
			const { container, view, wrapper } = getBcrs();
			if (!container || !view || !wrapper) return;

			setScrollPos((prev) => {
				let newPos = prev + diff;

				if (
					diff > 0 &&
					wrapper.width - newPos - view.width < view.width * tickerConfig.marginFactor
				) {
					newPos -= container.width;
					res++;
					appendContainer();
				} else if (diff < 0 && prev < view.width * tickerConfig.marginFactor) {
					newPos += container.width;
					res--;
					prependContainer();
				}
				return newPos;
			});

			return res;
		},
		[getBcrs]
	);

	useEffect(() => {
		const { view, wrapper } = getBcrs();
		if (!view || !wrapper) return;
		setScrollPos(wrapper.width / 2 - view.width / 2);
	}, [projectContainers]);

	useEffect(() => {
		if (state === 'scrolling') {
			return tickerAnimation.start();
		}
		tickerAnimation.stop();
	}, [state]);

	return (
		<div class={style.projectTicker} ref={tickerRef}>
			<div
				ref={wrapperRef}
				class={style.projectContainerWrapper}
				style={`transform: translateX(${scrollPos * -1}px)`}
			>
				{projectContainers}
			</div>
		</div>
	);
};

export default ProjectTicker;
