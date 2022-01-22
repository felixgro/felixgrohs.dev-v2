import { h, FunctionalComponent, Component, Fragment } from 'preact';

interface CustomTagProps {
	type: string;
	[x: string]: any; // rest props
}

const CustomTag: FunctionalComponent<CustomTagProps> = ({ type, children, ...attributes }) => {
	return h(type, attributes, children);
};

export default CustomTag;
