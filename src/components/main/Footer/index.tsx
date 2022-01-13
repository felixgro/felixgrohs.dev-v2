import { FunctionalComponent, h } from 'preact';
import style from './style.css';

const Footer: FunctionalComponent = () => {
	return (
		<footer class={style.footer}>
			<small>felixgrohs.dev</small>
		</footer>
	);
};

export default Footer;
