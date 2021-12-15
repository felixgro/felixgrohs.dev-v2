import { FunctionalComponent, h } from 'preact';
import style from '#/Footer.css';

const Footer: FunctionalComponent = () => {
	return (
		<footer class={style.footer}>
			<small>felixgrohs.dev</small>
		</footer>
	);
};

export default Footer;
