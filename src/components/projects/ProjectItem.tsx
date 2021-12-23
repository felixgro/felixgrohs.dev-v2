import { FunctionalComponent, h } from 'preact';
import style from '#/ProjectItem.css';

export interface Project {
	id: number;
	name: string;
	description: string;
	url: string;
	clone: string;
	homepage: string;
	languages: { name: string; val: number }[];
	stars: number;
	size: number;
}

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
