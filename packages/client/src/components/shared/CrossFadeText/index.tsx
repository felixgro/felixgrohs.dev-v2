import { h, FunctionalComponent, Component } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import DynamicTag from '@/components/shared/DynamicTag';
import style from './style.css';

interface CrossFadeTextProps {
	value: string;
	tag?: string;
	in?: Keyframe;
	out?: Keyframe;
}

const CrossFadeText: FunctionalComponent<CrossFadeTextProps> = (props) => {
	const [current, setCurrent] = useState<string>(props.value);

	const primaryTextRef = useRef<Component>(null);
	const secondaryTextRef = useRef<Component>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!primaryTextRef.current || !secondaryTextRef.current || current === props.value) return;

		const primaryEl = primaryTextRef.current.base as HTMLElement;
		const secondaryEl = secondaryTextRef.current.base as HTMLElement;

		const animationFinishHandler = () => {
			setCurrent(props.value);
			primaryEl.style.position = 'relative';
		};

		if (!('animate' in primaryEl)) {
			return animationFinishHandler();
		}

		const animationOptions: KeyframeAnimationOptions = {
			duration: 500,
			easing: 'ease-out',
		};

		primaryEl.style.position = 'absolute';

		const animations: Animation[] = [
			secondaryEl.animate([props.in!], animationOptions),
			primaryEl.animate([props.out!], animationOptions),
		];

		animations[1].addEventListener('finish', animationFinishHandler);
		return () => animations[1].removeEventListener('finish', animationFinishHandler);
	}, [props.value]);

	useEffect(() => {
		const secondaryEl = secondaryTextRef.current!.base as HTMLElement;
		Object.assign(secondaryEl.style, { ...props.out, pointerEvents: 'none' });
	}, []);

	return (
		<div ref={wrapperRef} class={style.wrapper}>
			<DynamicTag ref={primaryTextRef} type={props.tag!}>
				{current}
			</DynamicTag>
			<DynamicTag ref={secondaryTextRef} type={props.tag!} aria-hidden={true}>
				{props.value}
			</DynamicTag>
		</div>
	);
};

CrossFadeText.defaultProps = {
	tag: 'div',
	in: { opacity: 1 },
	out: { opacity: 0 },
};

export default CrossFadeText;
