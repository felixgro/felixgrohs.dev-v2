import { FunctionalComponent, h } from 'preact';
import { Project } from './ProjectTicker';
import useServerlessRequest from '../../hooks/useServerlessRequest';
import ProjectTicker from './ProjectTicker';
import style from './style.css';

const Projects: FunctionalComponent = () => {
	const response = useServerlessRequest<Project[]>('getProjects');

	console.log(response);

	return (
		<div class={style.projects}>
			{response.data ? <ProjectTicker projects={response.data} /> : <span>...</span>}
		</div>
	);
};

export default Projects;
