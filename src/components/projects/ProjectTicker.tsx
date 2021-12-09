import { h, FunctionalComponent } from 'preact';
import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import ProjectItem from './ProjectItem';
import style from './style.css';

const tickerConfig = {
	speed: 0.6, // automatic scrolling speed
	marginFactor: 2, // overlapping distance factor for both sides of the screen
	marginMin: 600, // minimum overlapping distance for mobile
	avgProjectWidth: 200, // average width of a signle project node
};

export interface Project {
	name: string;
	description: string;
	url: string;
	clone: string;
	homepage: string;
	languages: { [key: string]: number };
	stars: number;
	size: number;
}

type ProjectTickerProps = {
	projects: Project[];
};

const ProjectTicker: FunctionalComponent<ProjectTickerProps> = ({ projects }) => {
	const ticker = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);
	const width = useRef({
		ticker: 0,
		wrapper: 0,
		container: 0,
	});

	const [scrollPos, setScrollPos] = useState(0);

	const createProjectContainers = useCallback(() => {
		// approximate the width of a single container by using the average width of a project
		// this is necessary because the width of the container is not known until the projects are rendered
		const avgWidth = projects.length * tickerConfig.avgProjectWidth;
		const containers: any = [];

		// create as many containers as there is horizontal space for
		let currentWidth = 0;
		while (
			currentWidth <
			window.innerWidth + window.innerWidth * tickerConfig.marginFactor * 2
		) {
			currentWidth += avgWidth;
			containers.push(
				<div class={style.projectContainer}>
					{projects.map((project) => (
						<ProjectItem project={project} />
					))}
				</div>
			);
		}

		return containers;
	}, [projects]);

	// moves first container all the way to the right as the new trailing container
	// this container recycling is done to prevent the browser from creating new DOM nodes
	const appendContainer = useCallback(() => {
		const firstContainer = wrapper.current?.removeChild(wrapper.current?.firstChild!);
		if (firstContainer) wrapper.current?.appendChild(firstContainer);
	}, [wrapper]);

	const tickerMove = useCallback(() => {
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

		requestAnimationFrame(tickerMove);
	}, [width]);

	useEffect(() => {
		// center the ticker in the viewport each time a width changes
		setScrollPos(width.current.wrapper / 2 - width.current.ticker / 2);
	}, [width]);

	useEffect(() => {
		if (!wrapper.current || !ticker.current) return;
		width.current = {
			ticker: ticker.current.clientWidth,
			wrapper: wrapper.current.clientWidth,
			container: wrapper.current.firstElementChild!.clientWidth,
		};

		requestAnimationFrame(tickerMove);
	}, [ticker, wrapper]);

	return (
		<div class={style.projectTicker} ref={ticker}>
			<div
				ref={wrapper}
				class={style.projectContainerWrapper}
				style={`transform: translateX(${scrollPos * -1}px)`}
			>
				{createProjectContainers()}
			</div>
		</div>
	);
};

export default ProjectTicker;
