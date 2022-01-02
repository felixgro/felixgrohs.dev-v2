import { FunctionalComponent, h } from 'preact';
import { Project } from '@/components/projects/ProjectItem';
import ProjectDialog from '@/components/projects/ProjectDialog';
import ProjectFallback from '@/components/projects/ProjectFallback';
import TabFocusTarget from '@/components/shared/TabFocusTarget';
import ProjectContainer from './ProjectContainer';
import Ticker from '@/components/shared/Ticker';
import useAnimationFrame from '@/hooks/useAnimationFrame';
import useServerlessRequest from '@/hooks/useServerlessRequest';
import { useState, useMemo, useEffect } from 'preact/hooks';
import style from '#/Project.css';

const ProjectTicker: FunctionalComponent = () => {
	const response = useServerlessRequest<Project[]>('getProjects');
	const projects = useMemo<Project[] | undefined>(() => {
		return response.data;
	}, [response]);

	const [scroll, setScroll] = useState(0);

	const tickerAnimation = useAnimationFrame(() => {
		setScroll((curr) => curr + 1);
	}, []);

	const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>();
	const selectedProject = useMemo<Project | undefined>(() => {
		if (selectedProjectId === undefined) {
			return undefined;
		}
		return projects?.find((project) => project.id === selectedProjectId);
	}, [selectedProjectId, projects]);

	const projectClickHandler = (project: Project) => console.log('project clicked:', project);
	const tabTriggerHandler = () => console.log('tab trigger');

	useEffect(() => {
		// tickerAnimation.start();
	}, []);

	return (
		<aside class={style.projectWrapper} aria-label="Selection of projects">
			<TabFocusTarget onTrigger={tabTriggerHandler} label="Start project browsing" />
			<ProjectDialog project={selectedProject} />
			{projects ? (
				<div
					aria-hidden={true}
					style={{
						position: 'absolute',
						height: '100%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Ticker scroll={scroll} setScroll={setScroll}>
						<ProjectContainer
							projects={projects}
							onProjectClick={projectClickHandler}
						/>
					</Ticker>
				</div>
			) : (
				<ProjectFallback />
			)}
		</aside>
	);
};

export default ProjectTicker;
