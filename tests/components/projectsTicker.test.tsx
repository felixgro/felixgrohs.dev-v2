import { h } from 'preact';
import { shallow } from 'enzyme';
import { Project } from '../../src/components/projects/ProjectItem';
import ProjectTicker from '../../src/components/projects/ProjectTicker';
import ProjectItem from '../../src/components/projects/ProjectItem';

const generateProjects = (amount: number): Project[] => {
	const projects: Project[] = [];
	for (let i = 0; i < amount; i++) {
		projects.push({
			id: i,
			name: `Project #${i}`,
			description: 'Lorem Ipsum',
			homepage: 'https://felixgrohs.dev',
			clone: 'https://felixgrohs.dev',
			url: 'https://felixgrohs.dev',
			stars: 0,
			size: 10,
			languages: [
				{ name: 'TypeScript', val: 0.9 },
				{ name: 'CSS', val: 0.1 },
			],
		});
	}
	return projects;
};

describe('ProjectTicker', () => {
	const projectAmount = 5;
	const context = shallow(
		<ProjectTicker state={'scrolling'} projects={generateProjects(projectAmount)} />
	);

	test('has exact amount of projects', () => {
		expect(context.find(ProjectItem).length).toBe(projectAmount);
	});

	test('emits click event', () => {
		// context.find(ProjectItem).first().props().onClick();
	});
});
