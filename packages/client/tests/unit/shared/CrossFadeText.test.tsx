import { h } from 'preact';
import { mount } from 'enzyme';
import CrossFadeText from '@/components/shared/CrossFadeText';

describe('AnimatedFocus', () => {
	test('renders primary & secondary text', () => {
		const wrapper = mount(<CrossFadeText tag="h1" value="Hello there" />);
		const elements = wrapper.find('h1');
		expect(elements.length).toBe(2);
		elements.forEach((element) => {
			expect(element.text()).toBe('Hello there');
		});
	});

	test('hides secondary text', () => {
		const wrapper = mount(<CrossFadeText tag="h1" value="Hello there" />);
		const elements = wrapper.find('h1');
		expect(elements.at(1).prop('aria-hidden')).toBe(true);
	});

	test('cross fades when text updates', () => {
		const wrapper = mount(<CrossFadeText tag="h1" value="Hello there" />);
		const primaryElement = wrapper.find('h1').at(0);

		expect(primaryElement.text()).toBe('Hello there');
		wrapper.setProps({ value: 'Hello World' });
		expect(primaryElement.text()).toBe('Hello World');
	});
});
