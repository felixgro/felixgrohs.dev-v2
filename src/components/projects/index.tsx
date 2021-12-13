import { FunctionalComponent, h } from 'preact';
import { useState, useMemo, useEffect } from 'preact/hooks';
import useServerlessRequest from '../../hooks/useServerlessRequest';
import ProjectTicker, { TickerState } from './ProjectTicker';
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
		return selectedProjectId ? projects?.[selectedProjectId] : undefined;
	}, [selectedProjectId, projects]);

	const [state, setState] = useState<TickerState>('idle');

	useEffect(() => {
		setState('scrolling');
		return () => setState('idle');
	}, []);

	if (!projects) {
		return <div>Loading...</div>;
	}

	return (
		<div class={style.projectWrapper}>
			<ProjectDialog project={selectedProject} />

			<div class={style.projects}>
				<ProjectTicker
					state={state}
					projects={projects}
					onProjectClicked={() => setState('centering')}
					onProjectCentered={(proj) => {
						setState('paused');
						setSelectedProjectId(projects.indexOf(proj));
					}}
				/>
			</div>
		</div>
	);
};

export default Projects;
