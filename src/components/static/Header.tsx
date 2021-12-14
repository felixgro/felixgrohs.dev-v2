import { FunctionalComponent, h } from 'preact';
import style from './header.css';

const Header: FunctionalComponent = () => {
	return (
		<header class={style.header}>
			<a href="https://felixgrohs.dev">
				<svg
					aria-label="Personal Logo"
					role="img"
					class="logo"
					viewBox="0 0 172 254"
					width="30px"
					height="30px"
				>
					<path d="M102.4,186.79L71.4,201.28C75.962,218.202 78.902,235.52 80.18,253C103.899,240.444 113.742,211.113 102.4,186.79Z"></path>
					<path d="M149,86.62L44.16,135.62C52.599,150.292 59.669,165.711 65.28,181.68L124.59,154C142.371,145.678 153.782,127.74 153.782,108.107C153.782,100.681 152.149,93.345 149,86.62Z"></path>
					<path d="M166.69,0L0,77.91C12.354,90.282 23.513,103.792 33.33,118.26L142.24,67.35C160.034,59.036 171.456,41.093 171.456,21.452C171.456,14.039 169.829,6.716 166.69,-0Z"></path>
				</svg>
			</a>
			<a href="mailto:me@felixgrohs.dev">me@felixgrohs.dev</a>
		</header>
	);
};

export default Header;
