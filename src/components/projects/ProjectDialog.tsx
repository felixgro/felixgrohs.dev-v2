import { FunctionalComponent, h, Fragment } from 'preact';
import { Project } from './ProjectItem';
import style from './style.css';

interface ProjectDialogProps {
	project: Project | null;
}

const ProjectDialog: FunctionalComponent<ProjectDialogProps> = ({ project }) => {
	if (!project) return <></>;

	console.log(project.languages);

	return (
		<div class={style.dialog}>
			<header>
				<h1>{project.name}</h1>
				<ul>
					{project.languages.map((lang) => (
						<li>
							{lang.name} ({(Math.round(lang.val * 1000) / 1000) * 100}%)
						</li>
					))}
				</ul>
			</header>
			<p>{project.description}</p>
			<footer>
				<nav>
					<a href={project.url} target="_blank">
						Github
					</a>
					<br></br>
					<a href={project.homepage} target="_blank">
						Preview
					</a>
				</nav>
			</footer>
		</div>
	);
};

export default ProjectDialog;
