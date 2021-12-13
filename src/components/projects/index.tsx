import { FunctionalComponent, h } from 'preact';
import { useState, useMemo, useEffect, useRef } from 'preact/hooks';
import useServerlessRequest from '../../hooks/useServerlessRequest';
import ProjectTicker, { TickerState } from './ProjectTicker';
import ProjectTickerDebugger from './ProjectTickerDebugger';
import ProjectDialog from './ProjectDialog';
import { Project } from './ProjectItem';
import style from './style.css';

const Projects: FunctionalComponent = () => {
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

	useEffect(() => {
		setState('scrolling');
		return () => setState('idle');
	}, []);

	if (!projects) {
		return <small>Loading...</small>;
	} else {
		return (
			<div class={style.projectWrapper}>
				<ProjectDialog project={selectedProject} />
				<ProjectTickerDebugger state={state} />
				<div class={style.projects}>
					<ProjectTicker
						state={state}
						projects={projects}
						onProjectClicked={(proj) => {
							setState('centering');

							window.requestAnimationFrame(() => {
								const prevSelected = document.querySelectorAll(
									`.${style.projectActive}`
								);
								const newSelected = document.querySelectorAll(
									`[data-project-id='${proj.id}']`
								);
								prevSelected?.forEach((el) =>
									el.classList.remove(style.projectActive)
								);
								newSelected?.forEach((el) => el.classList.add(style.projectActive));
							});
						}}
						onProjectCentered={(proj, el) => {
							setState('paused');
							setSelectedProjectId(proj.id);
						}}
					/>
				</div>
			</div>
		);
	}
};

export default Projects;
