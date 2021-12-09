import { FunctionalComponent, h } from 'preact';
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
		</div>
	);
};

export default App;
