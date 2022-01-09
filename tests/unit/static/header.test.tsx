// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { h } from 'preact';
import { shallow } from 'enzyme';
import Header from '../../../src/components/static/Header';

describe('Header View', () => {
	const context = shallow(<Header />);

	test('has logo as svg', () => {
		expect(context.find('svg').exists()).toBe(true);
	});

	test('has email link', () => {
		const mailto = context.find('a[href^="mailto:"]');
		expect(mailto.exists()).toBe(true);
		expect(mailto.text()).toBe('me@felixgrohs.dev');
	});
});
