import { h } from 'preact';
import { shallow } from 'enzyme';
import Repeat from '@/components/shared/Repeat';

describe('Repeat', () => {
	test('duplicates element with specified amount', () => {
		const wrapper = shallow(
			<Repeat amount={3}>
				{() => {
					return <div>Hello World</div>;
				}}
			</Repeat>
		);

		const children = wrapper.children();

		expect(children.length).toBe(3);
		children.forEach((child) => {
			expect(child.text()).toBe('Hello World');
		});
	});

	test('passes optional idx to callback', () => {
		const wrapper = shallow(
			<Repeat amount={0}>
				{(idx) => {
					return <div key={idx}>{idx}</div>;
				}}
			</Repeat>
		);

		const children = wrapper.children();
		children.forEach((child, idx) => {
			expect(child.text()).toBe(idx.toString());
		});
	});

	test('renders nothing if amount is 0', () => {
		const wrapper = shallow(
			<Repeat amount={0}>
				{() => {
					return <div>Hello World</div>;
				}}
			</Repeat>
		);

		expect(wrapper.children().length).toBe(0);
		expect(wrapper.findWhere((child) => child.text() === 'Hello World').length).toBe(0);
	});
});
