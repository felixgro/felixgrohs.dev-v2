import type { Project } from '@/components/projects/ProjectItem';
import { h, FunctionalComponent, Fragment } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import ProjectDialog from './ProjectDialog';
import TabFocusTarget from '../shared/TabFocusTarget';
import Ticker from '../shared/Ticker';
import ProjectContainer from './ProjectContainer';
import useAnimationFrame from '@/hooks/useAnimationFrame';
import useStepAnimation from '@/hooks/useStepAnimation';
import style from '#/Project.css';

interface ProjectTickerProps {
	projects: Project[];
	velocity?: number;
	marginFactor?: number;
}

const ProjectTicker: FunctionalComponent<ProjectTickerProps> = ({
	projects,
	velocity,
	marginFactor,
}) => {
	if (!projects) return <></>;

	const [scroll, setScroll] = useState(0);
	const [selectedProject, setSelectedProject] = useState<Project>();
	const tickerContainerRef = useRef<HTMLDivElement>(null);

	const tickerAnimation = useAnimationFrame(() => {
		setScroll((s) => s + velocity!);
	}, [velocity]);

	const centerAnimation = useStepAnimation(scroll, setScroll, {
		easing: (p, b, c) => (c * p) / 1 + b,
		duration: 1000,
	});

	const clickProjectHandler = (project: Project, el: Element) => {
		const view = el.parentElement!.parentElement!.parentElement!.parentElement!,
			viewBcr = view.getBoundingClientRect(),
			elBcr = el.getBoundingClientRect(),
			diff = elBcr.x + elBcr.width / 2 - (viewBcr.x + viewBcr.width / 2);

		tickerAnimation.stop();
		centerAnimation.animateTo(scroll + diff);
		setSelectedProject(project);
	};

	const tabTriggerHandler = () => {
		console.log('tab trigger');
	};

	const updateStyles = useCallback(() => {
		tickerContainerRef
			.current!.querySelectorAll(`.${style.projectItemActive}`)
			.forEach((el) => el.classList.remove(style.projectItemActive));

		if (selectedProject) {
			const projElements = tickerContainerRef.current!.querySelectorAll(
				`[data-project-id="${selectedProject.id}"]`
			);

			projElements.forEach((el) => el.classList.add(style.projectItemActive));
		}
	}, [tickerContainerRef, selectedProject]);

	useEffect(() => {
		if (selectedProject) {
			requestAnimationFrame(updateStyles);
			return;
		}

		tickerAnimation.start();
	}, [selectedProject]);

	return (
		<>
			<TabFocusTarget onTrigger={tabTriggerHandler} label="Start project browsing" />
			<div class={style.projectTicker} aria-hidden={true} ref={tickerContainerRef}>
				<Ticker scroll={scroll} setScroll={setScroll} marginFactor={marginFactor}>
					<ProjectContainer projects={projects} onProjectClick={clickProjectHandler} />
				</Ticker>
			</div>
			<ProjectDialog project={selectedProject} />
		</>
	);
};

ProjectTicker.defaultProps = {
	velocity: 1,
	marginFactor: 1.5,
};

export default ProjectTicker;
