import type { Project } from '@felixgrohs/common/src/types/Github';
import { FunctionalComponent, h } from 'preact';
import style from './style.css';

export type ProjectClickHandler = (project: Project, el: HTMLElement) => void;

interface ProjectItemProps {
	project: Project;
	onClick?: ProjectClickHandler;
}

const ProjectItem: FunctionalComponent<ProjectItemProps> = ({ project, onClick }) => {
	const handleClickEvent = (e: Event) => {
		onClick?.(project, e.target as HTMLElement);
	};

	return (
		<div class={style.projectItem} onClick={handleClickEvent} data-project-id={project.id}>
			{project.name}
		</div>
	);
};

export default ProjectItem;
