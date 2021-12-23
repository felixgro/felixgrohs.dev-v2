import { h, FunctionalComponent } from 'preact';
import { TickerState } from './Ticker';
import style from '#/ProjectTickerDebugger.css';

interface TickerDebuggerProps {
	state: TickerState;
}

const TickerDebugger: FunctionalComponent<TickerDebuggerProps> = ({ state }) => {
	return (
		<div class={style.debugger}>
			<span>{state}</span>
		</div>
	);
};

export default TickerDebugger;
