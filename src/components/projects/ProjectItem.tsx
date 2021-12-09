import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Project } from './ProjectTicker';
import style from './style.css';

interface ProjectItemProps {
	project: Project;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
	return <div class={style.project}>{project.name}</div>;
};

export default ProjectItem;
