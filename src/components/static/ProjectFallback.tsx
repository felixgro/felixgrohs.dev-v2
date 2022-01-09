import { h, FunctionalComponent } from 'preact';
import style from '#/Project.css';
import { useEffect, useRef } from 'preact/hooks';

interface ProjectFallbackProps {
	show: boolean;
}

const ProjectFallback: FunctionalComponent<ProjectFallbackProps> = ({ show }) => {
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!elementRef.current) return;

		const animation = elementRef.current.animate([{ clipPath: 'inset(0 0 0 100%)' }], {
			duration: 320,
			delay: 1500,
			easing: 'ease-out',
			fill: 'forwards',
		});

		const handleAnimationFinish = () => elementRef.current?.remove();

		animation.addEventListener('finish', handleAnimationFinish);
		return () => animation.removeEventListener('finish', handleAnimationFinish);
	}, [show]);

	return (
		<div
			ref={elementRef}
			class={style.projectWrapper}
			style={{
				position: 'absolute',
				inset: 0,
				background: '#eee',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 1000,
				clipPath: 'inset(0)',
			}}
		>
			<span>
				Feel free to checkout my{' '}
				<a href="https://github.com/felixgro?tab=repositories">Projects</a>
			</span>
		</div>
	);
};

export default ProjectFallback;
