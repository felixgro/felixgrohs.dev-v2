import { h } from 'preact';
import { shallow } from 'enzyme';
import Intro from '@/components/main/Intro';

describe('Intro', () => {
	test('contains name', () => {
		const wrapper = shallow(<Intro />);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper.findWhere((n) => n.text().indexOf('Felix Grohs') > -1).exists()).toBe(true);
	});
});
