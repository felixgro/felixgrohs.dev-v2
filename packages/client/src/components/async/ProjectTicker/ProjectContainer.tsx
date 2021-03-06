import type { Project } from '@felixgrohs/common/src/types/Github';
import { h, FunctionalComponent } from 'preact';
import ProjectItem, { ProjectClickHandler } from './ProjectItem';
import style from './style.css';

interface ProjectContainerProps {
	projects: Project[];
	onProjectClick?: ProjectClickHandler;
}

const ProjectContainer: FunctionalComponent<ProjectContainerProps> = ({
	projects,
	onProjectClick,
}) => {
	return (
		<div class={style.projectContainer}>
			{projects.map((project) => (
				<ProjectItem key={project.id} project={project} onClick={onProjectClick} />
			))}
		</div>
	);
};

export default ProjectContainer;
