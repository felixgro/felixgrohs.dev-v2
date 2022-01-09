import { FunctionalComponent, h } from 'preact';
import Header from '@/components/static/Header';
import Intro from '@/components/static/Intro';
import Footer from '@/components/static/Footer';
import Projects from '@/components/Projects';
import AnimatedFocus from '@/components/shared/AnimatedFocus';

const App: FunctionalComponent = () => {
	return (
		<div id="app">
			<Header />
			<Intro />
			<Projects />
			<Footer />
			<AnimatedFocus />
		</div>
	);
};

export default App;
