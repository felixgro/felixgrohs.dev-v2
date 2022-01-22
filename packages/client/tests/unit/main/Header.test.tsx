import { h } from 'preact';
import { shallow } from 'enzyme';
import Header from '@/components/main/Header';

describe('Header', () => {
	test('renders svg logo and email', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper.find('svg').exists()).toBe(true);
		expect(wrapper.findWhere((n) => n.text() === 'me@felixgrohs.dev').exists()).toBe(true);
	});
});
