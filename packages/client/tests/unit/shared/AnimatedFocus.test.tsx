import { h } from 'preact';
import { mount } from 'enzyme';
import AnimatedFocus from '@/components/shared/AnimatedFocus';

describe('AnimatedFocus', () => {
	test('is disabled by default', () => {
		const wrapper = mount(<AnimatedFocus />);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.children().length).toBe(0);
	});
});
