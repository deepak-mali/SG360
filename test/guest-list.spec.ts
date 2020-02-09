import * as testPartners from '../public/test-partners';
import { partners } from '../src';

const correctLocation1 = { // co-ordinates in number.
	latitude: 51.515419,
	longitude: -0.141099,
};

const correctLocation2 = { // co-ordinates in string.
	latitude: '-33.8934219',
	longitude: '151.20404600000006',
};

const incorrectLocation1 = {
	latitude: null,
	longitude: -0.141099,
};

const incorrectLocation2 = '-33.8934219 151.20404600000006';

// Test case to convert degrees to radians.
describe ('degree to radians conversion...', () => {
	test ('convert numeric value to radians..', () => {
		expect(partners.toRadian(100)).toEqual(1.7453292519943295);
	});

	test ('convert string value to radians..', () => {
		let err;
		try {
			partners.toRadian('degree');
		} catch (error) {
			err = error;
		}
		expect(err).toEqual(new Error('Value provided is invalid.'));
	});

	test ('convert null value to radians..', () => {
		let err;
		try {
			partners.toRadian(null);
		} catch (error) {
			err = error;
		}
		expect(err).toEqual(new Error('Value provided is invalid.'));
	});
});

// Test case to validate locations.
describe ('validate locations...', () => {

	const incorrectLocationString = ' 51.515419,-0.141099';

	test ('testing with correct location coordinates..', () => {
		expect(partners.validateLocation(correctLocation1)).toBeTruthy();
		expect(partners.validateLocation(correctLocation1)).toStrictEqual(true);
	});

	test ('testing with null value in location coordinates...', () => {
		expect(partners.validateLocation(incorrectLocation1)).toBeUndefined();
	});

	test ('testing with string value in location coordinates...', () => {
		expect(partners.validateLocation(incorrectLocationString)).toBeUndefined();
	});
});

// Test case to denormalize json data.
describe ('denormalize data...', () => {
	test ('denormalizing correct test partner data...', () => {
		expect(partners.denormalize(testPartners.correctData)).toEqual(testPartners.denormalizedCorrectData);
	});

	test ('denormalizing incorrect test partner data...', () => {
		let err;
		try {
			partners.denormalize(testPartners.inCorrectData);
		} catch (error) {
			err = error;
		}
		expect(err).toEqual(new Error('Input data format is invalid'));
	});

	test ('testing with string...', () => {
		let err;
		try {
			partners.denormalize('incorrectData');
		} catch (error) {
			err = error;
		}
		expect(err).toEqual(new Error('Input data format is invalid'));
	});
});

// Test case to calculate Vincenty distance.
describe ('Testing Vincenty distance formula...', () => {

	test ('Vincenty distance with correct locations...', () => {
		expect(partners.vincentyDistance(correctLocation1, correctLocation2)).toEqual(16996.05441309498);
	});

	test ('denormalizing incorrect test partner data...', () => {
		let err;
		try {
			partners.vincentyDistance(correctLocation1, incorrectLocation1);
		} catch (error) {
			err = error;
		}
		expect(err).toEqual(new Error(`co-ordinates ${incorrectLocation1.latitude}, ${incorrectLocation1.longitude} are invalid location`));
	});
});

// Test case to generate guest list.
describe ('Testing guest list feature...', () => {

	test ('get guest list from provided data...', () => {
		expect(partners.guestList()).toEqual(testPartners.defaultGuestList);
	});

	test ('denormalizing incorrect test partner data...', () => {
		expect(partners.guestList(testPartners.correctData)).toHaveLength(0);
	});
});
