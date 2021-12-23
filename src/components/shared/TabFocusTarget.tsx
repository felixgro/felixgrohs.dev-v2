import { h, FunctionalComponent } from 'preact';

interface TabFocusTargetProps {
	label?: string;
	onTrigger?: () => void;
}

const TabFocusTarget: FunctionalComponent<TabFocusTargetProps> = ({ label, onTrigger }) => {
	return (
		<button
			onClick={onTrigger}
			aria-label={label}
			style={{
				border: 'none',
				position: 'absolute',
				height: '100%',
				width: '100%',
				padding: 0,
				margin: 0,
				background: 'none',
				pointerEvents: 'none',
				zIndex: 100000,
			}}
		></button>
	);
};

export default TabFocusTarget;
