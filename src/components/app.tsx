import { FunctionalComponent, h } from 'preact';
import Intro from './static/Intro';
import Header from './static/Header';
import Footer from './static/Footer';
import Projects from './projects/Projects';
import AnimatedFocus from './AnimatedFocus';

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
