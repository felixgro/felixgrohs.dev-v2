import { h, FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import style from './style.css';

interface ProjectFallbackProps {
	show: boolean;
	delay?: number;
}

const ProjectFallback: FunctionalComponent<ProjectFallbackProps> = ({ show, delay }) => {
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const iidx = setTimeout(() => {
			if (!elementRef.current || show) return;

			elementRef.current.animate([{ clipPath: 'inset(0 0 0 100%)' }], {
				duration: 480,
				easing: 'ease-out',
				fill: 'forwards',
			});
		}, delay);

		return () => clearTimeout(iidx);
	}, [show]);

	return (
		<div ref={elementRef} class={style.fallback}>
			<span>
				Feel free to checkout my{' '}
				<a href="https://github.com/felixgro?tab=repositories">Projects</a>
			</span>
		</div>
	);
};

ProjectFallback.defaultProps = {
	delay: 1500,
};

export default ProjectFallback;
