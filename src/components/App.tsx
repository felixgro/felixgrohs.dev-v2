import { FunctionalComponent, h } from 'preact';
import Intro from '@/components/static/Intro';
import Header from '@/components/static/Header';
import Footer from '@/components/static/Footer';
import ProjectContainer from '@/components/projects/Project';
import AnimatedFocus from '@/components/shared/AnimatedFocus';

const App: FunctionalComponent = () => {
	return (
		<div id="app">
			<Header />
			<Intro />
			<ProjectContainer />
			<Footer />
			<AnimatedFocus />
		</div>
	);
};

export default App;
