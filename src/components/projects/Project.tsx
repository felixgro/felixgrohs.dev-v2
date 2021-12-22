import { FunctionalComponent, h } from 'preact';
import { useState, useMemo, useEffect } from 'preact/hooks';
import useServerlessRequest from '@/hooks/useServerlessRequest';
import ProjectTicker, { TickerState } from './ProjectTicker';
import { Project as ProjectType } from './ProjectItem';
import ProjectTickerDebugger from './ProjectTickerDebugger';
import ProjectDialog from './ProjectDialog';
import TabFocusTarget from '../shared/TabFocusTarget';
import ProjectFallback from './ProjectFallback';
import style from '#/Project.css';
import stylePI from '#/ProjectItem.css';

const Project: FunctionalComponent = () => {
	const response = useServerlessRequest<ProjectType[]>('getProjects');
	const projects = useMemo<ProjectType[] | undefined>(() => {
		return response.data;
	}, [response]);

	const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>();
	const selectedProject = useMemo<ProjectType | undefined>(() => {
		if (selectedProjectId === undefined) {
			return undefined;
		}
		return projects?.find((project) => project.id === selectedProjectId);
	}, [selectedProjectId, projects]);

	const [state, setState] = useState<TickerState>('idle');

	useEffect(() => {
		setState('scrolling');
		return () => setState('idle');
	}, []);

	if (!projects) {
		return <ProjectFallback />;
	}

	return (
		<TabFocusTarget
			onTrigger={() => {
				console.log('hi');
			}}
		>
			<div class={style.projectWrapper}>
				<ProjectDialog project={selectedProject} />
				<ProjectTickerDebugger state={state} />
				<div class={style.projects}>
					<ProjectTicker
						state={state}
						projects={projects}
						onProjectClicked={(proj) => {
							setState('centering');
							requestAnimationFrame(() => {
								const prevSelected = document.querySelectorAll(
									`.${stylePI.projectItemActive}`
								);
								const newSelected = document.querySelectorAll(
									`[data-project-id='${proj.id}']`
								);
								prevSelected?.forEach((el) =>
									el.classList.remove(stylePI.projectItemActive)
								);
								newSelected?.forEach((el) =>
									el.classList.add(stylePI.projectItemActive)
								);
							});
						}}
						onProjectCentered={(proj) => {
							setState('paused');
							setSelectedProjectId(proj.id);
						}}
					/>
				</div>
			</div>
		</TabFocusTarget>
	);
};

export default Project;
