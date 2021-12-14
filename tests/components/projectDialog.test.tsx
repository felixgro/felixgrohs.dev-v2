import { h } from 'preact';
import { shallow } from 'enzyme';
import { Project } from '../../src/components/projects/ProjectItem';
import ProjectDialog from '../../src/components/projects/ProjectDialog';

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

describe('Dialog Props', () => {
	const project = generateProjects(1)[0];

	test('is hidden when no project set', () => {
		const context = shallow(<ProjectDialog />);
		expect(context.isEmptyRender()).toBe(true);
	});
});

describe('Dialog View', () => {
	const project = generateProjects(1)[0];
	const context = shallow(<ProjectDialog project={project} />);

	test('is visible when project set', () => {
		expect(context.isEmptyRender()).toBe(false);
	});

	test('renders project name', () => {
		expect(context.find('h2').text()).toBe(project.name);
	});

	test('renders project description', () => {
		const context = shallow(<ProjectDialog project={project} />);
		expect(context.find('p').text()).toBe(project.description);
	});

	test('renders project homepage', () => {
		const context = shallow(<ProjectDialog project={project} />);
		expect(context.find('a').text()).toBe(project.homepage);
	});

	test('renders project clone', () => {
		const context = shallow(<ProjectDialog project={project} />);
		expect(context.find('a').text()).toBe(project.clone);
	});

	test('renders project url', () => {
		const context = shallow(<ProjectDialog project={project} />);
		expect(context.find('a').text()).toBe(project.url);
	});

	test('renders project stars', () => {
		const context = shallow(<ProjectDialog project={project} />);
		expect(context.find('span').text()).toBe(`${project.stars}`);
	});

	test('renders project size', () => {
		const context = shallow(<ProjectDialog project={project} />);
		expect(context.find('span').text()).toBe(`${project.size}`);
	});
});
