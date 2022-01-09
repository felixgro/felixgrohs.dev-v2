// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { h } from 'preact';
import { shallow } from 'enzyme';
import Intro from '../../../src/components/static/Intro';

describe('Intro View', () => {
	const context = shallow(<Intro />);

	test('contains name at least once', () => {
		expect(
			context.findWhere((n) => {
				return n.text().indexOf('Felix Grohs') !== -1;
			}).length
		).toBeGreaterThan(0);
	});

	test('has at least one paragraph', () => {
		expect(context.find('p').length).toBeGreaterThan(0);
	});

	test('contains main element', () => {
		expect(context.find('main').length).toBe(1);
	});
});
