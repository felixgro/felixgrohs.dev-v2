import { FunctionalComponent, h, Fragment } from 'preact';
import { useState, useMemo, useEffect } from 'preact/hooks';
import useServerlessRequest from '../../hooks/useServerlessRequest';
import ProjectTicker from './ProjectTicker';
import ProjectDialog from './ProjectDialog';
import { Project } from './ProjectItem';
import style from './style.css';

const Projects: FunctionalComponent = () => {
	const response = useServerlessRequest<Project[]>('getProjects');
	const projects = useMemo<Project[] | undefined>(() => {
		return response.data;
	}, [response]);

	const [project, setProject] = useState<Project | null>(null);

	const onProjectClick = (project: Project, el: HTMLElement) => {
		console.log('clicked on project:', project, el);
		setProject(project);
	};

	if (!projects) {
		return <div>Loading...</div>;
	}

	return (
		<div class={style.projectWrapper}>
			<ProjectDialog project={project} />

			<div class={style.projects}>
				<ProjectTicker projects={projects} onProjectClick={onProjectClick} />
			</div>
		</div>
	);
};

export default Projects;
