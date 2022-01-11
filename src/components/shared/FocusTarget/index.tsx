import { h, FunctionalComponent } from 'preact';
import style from './style.css';

interface TabFocusTargetProps {
	label?: string;
	onTrigger?: () => void;
}

const TabFocusTarget: FunctionalComponent<TabFocusTargetProps> = ({ label, onTrigger }) => {
	return <button onClick={onTrigger} class={style.target} aria-label={label}></button>;
};

export default TabFocusTarget;
