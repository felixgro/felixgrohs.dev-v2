import { FunctionalComponent, h, Fragment } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { Project } from './ProjectItem';
import style from './style.css';

interface ProjectDialogProps {
	project: Project | null;
}

const ProjectDialog: FunctionalComponent<ProjectDialogProps> = ({ project }) => {
	if (!project) return <></>;
	const dialogRef = useRef<HTMLDivElement>(null);
	const prevHeight = useRef<number>(0);

	const animateHeightTo = useCallback((height: number) => {
		console.log({ height, prevHeight: prevHeight.current });

		dialogRef
			.current!.animate([{ height: prevHeight.current + 'px' }, { height: height + 'px' }], {
				duration: 300,
			})
			.addEventListener('finish', () => {
				dialogRef.current!.style.height = `${height}px`;
				prevHeight.current = height;
			});
	}, []);

	useEffect(() => {
		prevHeight.current = dialogRef.current?.clientHeight || 0;
	}, []);

	useEffect(() => {
		if (!dialogRef.current || !prevHeight) return;
		dialogRef.current.style.height = `auto`;
		const newHeight = dialogRef.current.getBoundingClientRect().height;
		dialogRef.current.style.height = `${prevHeight.current}px`;
		animateHeightTo(newHeight);
	}, [project]);

	return (
		<div ref={dialogRef} class={style.dialog}>
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
