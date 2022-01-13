import { h } from 'preact';
import { shallow } from 'enzyme';
import Footer from '@/components/main/Footer';

describe('Footer', () => {
	test('is not empty render', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper.isEmptyRender()).toBe(false);
	});
});
