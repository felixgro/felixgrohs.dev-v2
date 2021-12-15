import { h, FunctionalComponent } from 'preact';
import style from '#/Intro.css';

const Intro: FunctionalComponent = () => {
	return (
		<main class={style.intro}>
			<article>
				<h1>I&#8217;m Felix Grohs.</h1>

				<p>
					A certified Webdeveloper with a passion for creating clean & accessible
					experiences for the modern web.
				</p>
				<p>
					Visit me on <a href="#">Github</a> or <a href="#">Twitter</a>.
				</p>
			</article>
			<div>Demo</div>
		</main>
	);
};

export default Intro;
