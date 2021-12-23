import { FunctionalComponent, h } from 'preact';
import { useState, useMemo, useEffect, useRef } from 'preact/hooks';
import useServerlessRequest from '@/hooks/useServerlessRequest';
import Ticker, { TickerState } from '@/components/shared/Ticker';
import ProjectItem, { Project } from '@/components/projects/ProjectItem';
import ProjectDialog from '@/components/projects/ProjectDialog';
import ProjectFallback from '@/components/projects/ProjectFallback';
import TabFocusTarget from '@/components/shared/TabFocusTarget';
import style from '#/Project.css';
import stylePI from '#/ProjectItem.css';
import ProjectContainer from './ProjectContainer';

const ProjectTicker: FunctionalComponent = () => {
	const response = useServerlessRequest<Project[]>('getProjects');
	const projects = useMemo<Project[] | undefined>(() => {
		return response.data;
	}, [response]);

	const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>();
	const selectedProject = useMemo<Project | undefined>(() => {
		if (selectedProjectId === undefined) {
			return undefined;
		}
		return projects?.find((project) => project.id === selectedProjectId);
	}, [selectedProjectId, projects]);

	const [state, setState] = useState<TickerState>('idle');

	const projectClickHandler = (project: Project) => console.log('project clicked:', project);
	const tabTriggerHandler = () => console.log('tab trigger');

	useEffect(() => {
		setState('scrolling');
		return () => setState('idle');
	}, []);

	if (!projects) {
		return <ProjectFallback />;
	}

	return (
		<aside class={style.projectWrapper} aria-label="Selection of projects">
			<TabFocusTarget onTrigger={tabTriggerHandler} label="Start project browsing" />
			<ProjectDialog project={selectedProject} />

			<Ticker
				state={state}
				speed={1}
				centeringSpeed={0.8}
				centeringDurationMax={500}
				centeringEase="ease-out"
				marginFactor={1.5}
				marginMin={600}
				debug={true}
			>
				<ProjectContainer projects={projects} onProjectClick={projectClickHandler} />
			</Ticker>
		</aside>
	);
};

export default ProjectTicker;
