import { h, FunctionalComponent } from 'preact';
import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import useAnimationFrame from '../../hooks/useAnimationFrame';
import ProjectItem, { Project } from './ProjectItem';
import style from './style.css';

const tickerConfig = {
	speed: 0.5, // automatic scrolling speed
	centeringSpeed: 0.8, // speed of centering the clicked project
	centeringDurationMax: 0.5, // max duration of centering the clicked project (can increase specified centeringSpeed)
	centeringEase: 'ease-out', // easing function for centering
	marginFactor: 1.8, // overlapping distance factor for both sides of the screen
	marginMin: 600, // minimum overlapping distance for mobile
	avgProjectWidth: 200, // average width of a signle project node
	containerGenerationFaktor: 0.75, // factor of the container size to generate new container on click events
};

export type TickerState = 'idle' | 'scrolling' | 'paused' | 'centering';

type ProjectTickerProps = {
	state: TickerState;
	projects: Project[];
	onProjectClicked?: (project: Project, element: HTMLElement) => void;
	onProjectCentered?: (project: Project, element: HTMLElement) => void;
};

const ProjectTicker: FunctionalComponent<ProjectTickerProps> = ({
	state,
	projects,
	onProjectClicked,
	onProjectCentered,
}) => {
	const [scrollPos, setScrollPos] = useState(0);

	const ticker = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);
	const clickDiff = useRef(0);
	const width = useRef({
		ticker: 0,
		wrapper: 0,
		container: 0,
	});

	const tickerAnimation = useAnimationFrame(() => {
		if (state !== 'scrolling') return;

		setScrollPos((curr) => {
			if (
				width.current.wrapper - curr + width.current.ticker / 2 <
				tickerConfig.marginFactor * window.innerWidth
			) {
				appendContainer();
				return curr - width.current.container;
			}
			return curr + tickerConfig.speed;
		});
	});

	const projectClickHandler = useCallback(
		(project: Project, el: HTMLElement) => {
			onProjectClicked?.(project, el);
			const itemBcr = el.getBoundingClientRect();
			const tickerBcr = ticker.current!.getBoundingClientRect();
			const diff = itemBcr.x + itemBcr.width / 2 - (tickerBcr.x + tickerBcr.width / 2);
			const duration = Math.abs(diff / tickerConfig.centeringSpeed);
			const currentX =
				parseFloat(wrapper.current!.style.transform.replace(/[^\d.]/g, '')) * -1;

			wrapper
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
		[wrapper.current]
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

	const initProjectContainers = useCallback(() => {
		// approximate the width of a single container by using the average width of a project
		// this is necessary because the width of the container is not known until the projects are rendered
		const avgContainerWidth = projects.length * tickerConfig.avgProjectWidth;
		const containers = [];

		// create as many containers as there is horizontal space for
		let currentWidth = 0;
		while (
			currentWidth <
			window.innerWidth + window.innerWidth * tickerConfig.marginFactor * 2
		) {
			const container = createProjectContainer();
			currentWidth += avgContainerWidth;
			containers.push(container);
		}

		return containers;
	}, [projects]);

	// moves first container all the way to the right as the new trailing container
	// this container recycling is done to prevent the browser from creating new DOM nodes
	const appendContainer = useCallback(() => {
		const firstContainer = wrapper.current?.removeChild(wrapper.current?.firstChild!);
		if (firstContainer) wrapper.current?.appendChild(firstContainer);
	}, [wrapper]);

	const prependContainer = useCallback(() => {
		const lastContainer = wrapper.current?.removeChild(wrapper.current?.lastChild!);
		if (lastContainer)
			wrapper.current?.insertBefore(lastContainer, wrapper.current?.firstChild);
	}, [wrapper]);

	const animationCleanup = useCallback(
		(diff: number) => {
			setScrollPos((prev) => {
				let newPos = prev + diff;
				clickDiff.current += diff;

				if (
					clickDiff.current >
					width.current.container * tickerConfig.containerGenerationFaktor
				) {
					clickDiff.current -= width.current.container;
					appendContainer();
					newPos -= width.current.container;
				} else if (
					clickDiff.current <
					-width.current.container * tickerConfig.containerGenerationFaktor
				) {
					clickDiff.current += width.current.container;
					prependContainer();
					newPos += width.current.container;
				}

				return newPos;
			});
		},
		[width.current]
	);

	useEffect(() => {
		// center the ticker in the viewport each time a width changes
		setScrollPos(width.current.wrapper / 2 - width.current.ticker / 2);
	}, [width.current]);

	useEffect(() => {
		if (state === 'scrolling') {
			return tickerAnimation.start();
		}
		tickerAnimation.stop();
	}, [state]);

	useEffect(() => {
		if (!wrapper.current || !ticker.current) return;
		width.current = {
			ticker: ticker.current.clientWidth,
			wrapper: wrapper.current.clientWidth,
			container: wrapper.current.firstElementChild!.clientWidth,
		};
	}, []);

	return (
		<div class={style.projectTicker} ref={ticker}>
			<div
				ref={wrapper}
				class={style.projectContainerWrapper}
				style={`transform: translateX(${scrollPos * -1}px)`}
			>
				{initProjectContainers()}
			</div>
		</div>
	);
};

export default ProjectTicker;
