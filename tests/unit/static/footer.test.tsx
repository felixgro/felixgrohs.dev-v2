// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { h } from 'preact';
import { shallow } from 'enzyme';
import Footer from '../../../src/components/static/Footer';

describe('Footer View', () => {
	const context = shallow(<Footer />);

	test('has at least one element', () => {
		expect(context.children.length).toBeGreaterThan(0);
	});
});
