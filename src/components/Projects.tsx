import { h, FunctionalComponent } from 'preact';
import useProjects from '@/hooks/useProjects';
import ProjectTicker from '@/components/async/ProjectTicker';
import ProjectFallback from '@/components/static/ProjectFallback';
import style from '#/Project.css';

const Projects: FunctionalComponent = () => {
	const projects = useProjects();

	return (
		<aside class={style.projects} aria-label="Selection of projects">
			{projects ? (
				<ProjectTicker projects={projects!} velocity={1} marginFactor={1.5} />
			) : null}
			<ProjectFallback show={!projects} />
		</aside>
	);
};

export default Projects;
