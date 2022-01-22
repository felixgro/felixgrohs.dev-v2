import { h } from 'preact';
import { shallow } from 'enzyme';
import DynamicTag from '@/components/shared/DynamicTag';

describe('DynamicTag', () => {
	test('renders element with dynamic tag', () => {
		const wrapper = shallow(<DynamicTag type="h1">Hello World</DynamicTag>);
		const element = wrapper.find('h1');
		expect(element.exists()).toBe(true);
		expect(element.text()).toBe('Hello World');
	});

	test('passes additional attributes to element', () => {
		const wrapper = shallow(<DynamicTag type="p" aria-hidden="true" />);
		const element = wrapper.find('p');
		expect(element.exists()).toBe(true);
		expect(element.prop('aria-hidden')).toBe('true');
	});
});
