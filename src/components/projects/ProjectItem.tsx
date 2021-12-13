import { FunctionalComponent, h } from 'preact';
import { useCallback } from 'preact/hooks';
import style from './style.css';

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

interface ProjectItemProps {
	project: Project;
	onClick: (project: Project, el: HTMLElement) => void;
}

const ProjectItem: FunctionalComponent<ProjectItemProps> = ({ project, onClick }) => {
	const handleClickEvent = useCallback(
		(e: Event) => {
			onClick(project, e.target as HTMLElement);
		},
		[onClick, project]
	);

	return (
		<div class={style.project} onClick={handleClickEvent} data-project-id={project.id}>
			{project.name}
		</div>
	);
};

export default ProjectItem;
