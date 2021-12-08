import { FunctionalComponent, h } from 'preact';
import Header from './main/Header';
import Content from './main/Content';
import Footer from './main/Footer';
import ProjectScroller from './project/projectScroller';

const App: FunctionalComponent = () => {
	return (
		<div id="app">
			<Header />
			<Content />
			<ProjectScroller />
			<Footer />
		</div>
	);
};

export default App;
