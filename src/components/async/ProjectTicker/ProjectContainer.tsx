import { h, FunctionalComponent, Ref } from 'preact';
import ProjectItem, { Project, ProjectClickHandler } from './ProjectItem';
import style from '#/ProjectTicker.css';

interface ProjectContainerProps {
	projects: Project[];
	onProjectClick?: ProjectClickHandler;
	ref?: Ref<HTMLElement>;
}

const ProjectContainer: FunctionalComponent<ProjectContainerProps> = ({
	projects,
	onProjectClick,
}) => {
	return (
		<div class={style.projectContainer}>
			{projects.map((project) => (
				<ProjectItem project={project} onClick={onProjectClick} />
			))}
		</div>
	);
};

export default ProjectContainer;
