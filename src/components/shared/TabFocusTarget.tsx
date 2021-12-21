import { h, FunctionalComponent } from 'preact';

interface TabFocusTargetProps {
	label?: string;
	onTrigger?: () => void;
}

const TabFocusTarget: FunctionalComponent<TabFocusTargetProps> = ({ children, ...props }) => {
	return (
		<button
			onClick={props.onTrigger}
			tabIndex={0}
			style={{
				border: 'none',
				padding: 0,
				margin: 0,
				background: 'none',
				pointerEvents: 'none !important',
				zIndex: 100000,
			}}
		>
			{children}
		</button>
	);
};

export default TabFocusTarget;
