import { h, FunctionalComponent, Fragment } from 'preact';

export interface RepeatProps {
	amount: number;
	children: (idx: number) => JSX.Element;
}

const Repeat: FunctionalComponent<RepeatProps> = ({ amount, children }) => {
	return <>{Array.from({ length: amount }).map((_, idx) => children(idx))}</>;
};

export default Repeat;
