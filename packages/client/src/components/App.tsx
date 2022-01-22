import { FunctionalComponent, h } from 'preact';
import { useErrorBoundary } from 'preact/hooks';
import { handleError } from '@/utils/error';
import Header from '@/components/main/Header';
import Intro from '@/components/main/Intro';
import Footer from '@/components/main/Footer';
import Projects from '@/components/main/Projects';
import AnimatedFocus from '@/components/shared/AnimatedFocus';

const App: FunctionalComponent = () => {
	useErrorBoundary(handleError);

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
