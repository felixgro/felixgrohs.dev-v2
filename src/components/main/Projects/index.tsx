import { h, FunctionalComponent } from 'preact';
import useProjects from '@/hooks/useProjects';
import ProjectTicker from '@/components/async/ProjectTicker';
import ProjectFallback from './Fallback';
import style from './style.css';

const Projects: FunctionalComponent = () => {
	const projects = useProjects();

	return (
		<aside class={style.projects} aria-label="Selection of projects">
			<ProjectFallback show={!projects} />
			{projects && <ProjectTicker projects={projects} velocity={1} marginFactor={1.5} />}
		</aside>
	);
};

export default Projects;
