import { h, FunctionalComponent } from 'preact';
import useProjects from '@/hooks/useProjects';
import ProjectTicker from '@/components/projects/ProjectTicker2';
import ProjectFallback from '@/components/projects/ProjectFallback';
import style from '#/Project.css';

const Projects: FunctionalComponent = () => {
	const projects = useProjects();

	return (
		<aside class={style.projects} aria-label="Selection of projects">
			{projects ? <ProjectTicker projects={projects} /> : <ProjectFallback />}
		</aside>
	);
};

export default Projects;
