import { h } from 'preact';
import { mount } from 'enzyme';
import Repeat from '../../../src/components/shared/Repeat';

describe('Repeat', () => {
	test('duplicates element with specified amount', () => {
		const context = mount(
			<Repeat amount={3}>
				{(idx) => {
					return <div key={idx}>{idx}</div>;
				}}
			</Repeat>
		);

		expect(context.children().length).toBe(3);
	});
});
