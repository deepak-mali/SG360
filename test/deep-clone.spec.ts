
import { deepClone } from '../src';

// Test cases for deep clone logic.
describe('Testing deep clone functionality...', () => {

	test('Testing with number array', () => {
		const testNumberArray = [2, 2, 2];
		expect(deepClone(testNumberArray)).toEqual([2, 2, 2]);
	});

	test('Testing with string array...', () => {
		const testStringArray = ['deepak', 'mali'];
		expect(deepClone(testStringArray)).toEqual(['deepak', 'mali']);
	});

	test('Testing with simple object...', () => {
		const testSimpleObject = {
			name: 'Paddy',
			town: 'Lerum',
			country: 'Sweden',
		};

		expect(deepClone(testSimpleObject)).toEqual({
			name: 'Paddy',
			town: 'Lerum',
			country: 'Sweden',
		});
	});

	test('Testing with nested object...', () => {
		const testNestedObject = {
			name: 'Paddy',
			address: {
				town: 'Lerum',
				country: 'Sweden',
			},
		};

		expect(deepClone(testNestedObject)).toEqual({
			name: 'Paddy',
			address: {
				town: 'Lerum',
				country: 'Sweden',
			},
		});
	});

	test('Testing with null object...', () => {
		let err;
		try {
			deepClone(null);
		} catch (error) {
			err = error;
		}

		expect(err).toEqual(new Error('Input variable is not an object or null'));
	});
});
