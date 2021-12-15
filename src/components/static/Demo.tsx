import { h, FunctionalComponent, Fragment } from 'preact';
import { useMemo } from 'preact/hooks';
import useWindowSize from '@/hooks/useWindowSize';
import style from '#/Demo.css';

const Demo: FunctionalComponent = () => {
	const { width } = useWindowSize();

	const visible = useMemo(() => {
		if (width > 1000) {
			return true;
		} else {
			return false;
		}
	}, [width]);

	if (!visible) {
		return <></>;
	}

	return (
		<>
			<canvas class={style.canvas} height="400" width="250"></canvas>
		</>
	);
};

export default Demo;
