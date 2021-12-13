import { FunctionalComponent, h } from 'preact';
import style from './style.css';

const MainContent: FunctionalComponent = () => {
	return (
		<main>
			<h1>Hello there!</h1>
			<h2>I’m Felix Grohs.</h2>
			<p
				style={{
					maxWidth: '500px',
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorum, dolore
				ipsum obcaecati non nobis officiis. <a href="#">Link1</a> and <a href="#">Link2</a>
			</p>
			<br></br>
			<p
				style={{
					maxWidth: '500px',
				}}
			>
				<a href="#">Link3</a> and <a href="#">Link4</a>
			</p>
			<p
				style={{
					maxWidth: '500px',
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. <a href="#">Link5</a>
				Asperiores dolorum, dolore ipsum obcaecati non nobis officiis. <a href="#">Link6</a>
				speriores dolorum, dolore ipsum obcaecati non nobis officiis. and{' '}
				<a href="#">Link2</a>
			</p>
		</main>
	);
};

export default MainContent;
