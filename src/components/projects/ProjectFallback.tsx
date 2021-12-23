import { h, FunctionalComponent } from 'preact';
import style from '#/Project.css';

const ProjectFallback: FunctionalComponent = () => {
	return <div class={style.projectWrapper}>Projects loading...</div>;
};

export default ProjectFallback;
