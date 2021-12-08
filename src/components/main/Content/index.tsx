import { FunctionalComponent, h } from 'preact';
import style from './style.css';

const MainContent: FunctionalComponent = () => {
	return (
		<main>
			<h1>Hello there!</h1>
			<h2>I’m Felix Grohs.</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorum, dolore
				ipsum obcaecati non nobis officiis.
			</p>
		</main>
	);
};

export default MainContent;
