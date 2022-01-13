import { h } from 'preact';
import { shallow } from 'enzyme';
import FocusTarget from '@/components/shared/FocusTarget';

describe('FocusTarget', () => {
	test('renders an invisible button', () => {
		const wrapper = shallow(<FocusTarget />);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper.getElement().type).toBe('button');
	});

	test('can render with accessible label', () => {
		const wrapper = shallow(<FocusTarget label="Hello World" />);
		expect(wrapper.prop('aria-label')).toBe('Hello World');
	});

	test('can listen for focus trigger event', () => {
		const onTrigger = jest.fn();
		const wrapper = shallow(<FocusTarget onTrigger={onTrigger} />);
		wrapper.simulate('click');
		expect(onTrigger).toHaveBeenCalled();
	});
});
