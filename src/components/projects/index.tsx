import { FunctionalComponent, h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import useServerlessRequest from '../../hooks/useServerlessRequest';
import ProjectTicker from './ProjectTicker';
import ProjectDialog from './ProjectDialog';
import { Project } from './ProjectItem';
import style from './style.css';

const Projects: FunctionalComponent = () => {
	const response = useServerlessRequest<Project[]>('getProjects');
	const [project, setProject] = useState<Project | null>(null);

	const onProjectClick = (project: Project, el: HTMLElement) => {
		console.log('clicked on project:', project, el);
		setProject(project);
	};

	return (
		<>
			{response.data ? (
				<div class={style.projectWrapper}>
					<ProjectDialog project={project} />

					<div class={style.projects}>
						<ProjectTicker projects={response.data} onProjectClick={onProjectClick} />
					</div>
				</div>
			) : (
				<div>...</div>
			)}
		</>
	);
};

export default Projects;
