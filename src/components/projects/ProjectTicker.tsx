import { h } from 'preact';
import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import ProjectItem from './ProjectItem';
import style from './style.css';

const tickerConfig = {
	speed: 0.6, // automatic scrolling speed
	margin: innerWidth * 2, // overlapping distance form both sides of the screen
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

const ProjectTicker = ({ projects }: ProjectTickerProps) => {
	const ticker = useRef<HTMLDivElement>(null);
	const container = useRef<HTMLDivElement>(null);
	const [scrollPos, setScrollPos] = useState(0);
	const width = useRef({
		ticker: 0,
		wrapper: 0,
		container: 0,
	});

	const createProjectContainers = useCallback(() => {
		const avgWidth = projects.length * 200;
		const containers: any = [];
		let currentWidth = 0;

		while (currentWidth < window.innerWidth + tickerConfig.margin * 2) {
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

	const appendContainer = useCallback(() => {
		if (!container.current) return;
		const firstContainer = container.current.removeChild(container.current.firstChild!);
		container.current.appendChild(firstContainer);
	}, [container]);

	const tickerMove = useCallback(() => {
		setScrollPos((curr) => {
			if (width.current.wrapper - curr + width.current.ticker / 2 < tickerConfig.margin) {
				appendContainer();
				return curr - width.current.container;
			}
			return curr + tickerConfig.speed;
		});

		requestAnimationFrame(tickerMove);
	}, [width]);

	useEffect(() => {
		setScrollPos(width.current.wrapper / 2 - width.current.ticker / 2);
	}, [width]);

	useEffect(() => {
		if (!container.current || !ticker.current) return;
		width.current = {
			ticker: ticker.current.clientWidth,
			wrapper: container.current.clientWidth,
			container: container.current.firstElementChild!.clientWidth,
		};

		requestAnimationFrame(tickerMove);
	}, [ticker, container]);

	return (
		<div class={style.projectTicker} ref={ticker}>
			<div
				ref={container}
				class={style.projectContainerWrapper}
				style={`transform: translateX(${scrollPos * -1}px)`}
			>
				{createProjectContainers()}
			</div>
		</div>
	);
};

export default ProjectTicker;
