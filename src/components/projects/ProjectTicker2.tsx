import type { Project } from '@/components/projects/ProjectItem';
import { h, FunctionalComponent, Fragment } from 'preact';
import { useState, useEffect, useMemo } from 'preact/hooks';
import ProjectDialog from './ProjectDialog';
import TabFocusTarget from '../shared/TabFocusTarget';
import Ticker from '../shared/Ticker';
import ProjectContainer from './ProjectContainer';
import useAnimationFrame from '@/hooks/useAnimationFrame';
import style from '#/Project.css';

interface ProjectTickerProps {
	projects: Project[];
	vel?: number;
}

const ProjectTicker: FunctionalComponent<ProjectTickerProps> = ({ projects, vel }) => {
	if (!projects) return <></>;
	const [scroll, setScroll] = useState(0);

	const tickerAnimation = useAnimationFrame(() => {
		setScroll((curr) => curr + vel!);
	}, []);

	const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>();
	const selectedProject = useMemo<Project | undefined>(() => {
		if (selectedProjectId === undefined) {
			return undefined;
		}
		return projects?.find((project) => project.id === selectedProjectId);
	}, [selectedProjectId, projects]);

	const projectClickHandler = (project: Project, el: HTMLElement) => {
		console.log('project clicked:', project, el);
	};

	const tabTriggerHandler = () => {
		console.log('tab trigger');
	};

	useEffect(() => {
		tickerAnimation.start();
	}, []);

	return (
		<>
			<TabFocusTarget onTrigger={tabTriggerHandler} label="Start project browsing" />
			<div class={style.projectTicker} aria-hidden={true}>
				<Ticker scroll={scroll} setScroll={setScroll}>
					<ProjectContainer projects={projects} onProjectClick={projectClickHandler} />
				</Ticker>
			</div>
			<ProjectDialog project={selectedProject} />
		</>
	);
};

ProjectTicker.defaultProps = {
	vel: 1,
};

export default ProjectTicker;
