import { FunctionalComponent, h } from 'preact';
import style from './style.css';

const Header: FunctionalComponent = () => {
	return (
		<header class={style.header}>
			<h1>F</h1>
			<a href="mailto:me@felixgrohs.dev">me@felixgrohs.dev</a>
		</header>
	);
};

export default Header;
