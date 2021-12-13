import { FunctionalComponent, h } from 'preact';
import AnimatedFocus from './AnimatedFocus';
import Header from './main/Header';
import Content from './main/Content';
import Footer from './main/Footer';
import Projects from './projects';

const App: FunctionalComponent = () => {
	return (
		<div id="app">
			<Header />
			<Content />
			<Projects />
			<Footer />
			<AnimatedFocus />
		</div>
	);
};

export default App;
