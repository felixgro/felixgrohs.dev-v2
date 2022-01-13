import { h } from 'preact';
import { mount } from 'enzyme';
import Ticker from '@/components/shared/Ticker';

describe('Ticker', () => {
	test('is empty render by default', () => {
		const wrapper = mount(<Ticker scroll={0} />);
		expect(wrapper.isEmptyRender()).toBe(true);
	});

	test("appends it's children", () => {
		const wrapper = mount(
			<Ticker scroll={0}>
				<h1>Hello World</h1>
			</Ticker>
		);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper.find('h1').exists()).toBe(true);
		expect(wrapper.find('h1').text()).toBe('Hello World');
	});
});
