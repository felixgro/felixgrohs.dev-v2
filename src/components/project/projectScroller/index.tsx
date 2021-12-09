import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import useGithubRepos from '../../../hooks/useGithubRepos';
import style from './style.css';

const ProjectScroller: FunctionalComponent = () => {
	const repos = useGithubRepos(process.env.GITHUB_USER!, process.env.GITHUB_TOKEN!);

	return (
		<div class={style.scroller}>
			Projects
			{repos.map((repo) => (
				<div>{repo.description}</div>
			))}
		</div>
	);
};

export default ProjectScroller;
