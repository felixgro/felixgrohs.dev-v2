import { h, FunctionalComponent } from 'preact';

interface LinebreakProps {
	active?: boolean;
}

const Linebreak: FunctionalComponent<LinebreakProps> = ({ active }) => {
	if (active || active === undefined) {
		return <br />;
	}

	return <span> </span>;
};

export default Linebreak;
