import { h, FunctionalComponent } from 'preact';
import { TickerState } from './ProjectTicker';
import style from '#/ProjectTickerDebugger.css';

interface DebuggerProps {
	state: TickerState;
}

const ProjectTickerDebugger: FunctionalComponent<DebuggerProps> = ({ state }) => {
	return (
		<div class={style.debugger}>
			<span>{state}</span>
		</div>
	);
};

export default ProjectTickerDebugger;
