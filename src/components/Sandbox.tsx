import { h, FunctionalComponent } from 'preact';
import CrossFadeText from '@/components/shared/CrossFadeText';
import { useState } from 'preact/hooks';

const Sandbox: FunctionalComponent = () => {
	const [value, setValue] = useState('Swag');

	const submitHandler = (e: Event) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const input = form.querySelector('input') as HTMLInputElement;
		setValue(input.value);
	};

	return (
		<div style={{ width: 200 }}>
			<CrossFadeText value={value} tag="h1" />

			<form onSubmit={submitHandler}>
				<input name="swag" type="text" value={value} id={'swag'} />
				<button type="submit">Update</button>
			</form>
		</div>
	);
};

export default Sandbox;
