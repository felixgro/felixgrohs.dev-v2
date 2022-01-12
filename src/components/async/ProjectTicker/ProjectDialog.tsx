import { FunctionalComponent, h, Fragment } from 'preact';
import { useEffect, useRef, useCallback } from 'preact/hooks';
import { Project } from './ProjectItem';
import CrossFadeText from '@/components/shared/CrossFadeText';
import style from '#/ProjectDialog.css';

interface ProjectDialogProps {
	project?: Project;
}

const ProjectDialog: FunctionalComponent<ProjectDialogProps> = ({ project }) => {
	if (project === undefined) {
		return <></>;
	}

	const dialogRef = useRef<HTMLDivElement>(null);
	const prevHeight = useRef<number>(0);

	const animateHeightTo = useCallback((height: number) => {
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
				<CrossFadeText value={project.name} tag="h1" />
			</header>
			<CrossFadeText value={project.description} tag="p" />
			<ul>
				{project.languages.map((lang) => (
					<li>
						{lang.name} ({(Math.round(lang.val * 1000) / 1000) * 100}%)
					</li>
				))}
			</ul>
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
