/**
 * @author Deepak Mali <mail2deepakmali@gmail.com>
 * @description - Function to filter out partners having companies within range of 100kms of central london (51.515419, -0.141099).
 * @param { object } object - Input object.
 * @returns { object } - Cloned object of input object.
 */

import data from '../public/partners.json';

const EARTH_RADIUS = 6371;
const DISTANCE = 100;
const EPICENTER_LOCATION = {
	latitude: 51.515419,
	longitude: -0.141099,
};

const validateLocation = (location) => {
	if (typeof location === 'object' && location.latitude && location.longitude) {
		location.latitude = Number(location.latitude);
		location.longitude = Number(location.longitude);
		return -90.0 <= location.latitude && location.latitude <= 90.0 && -180.0 <= location.longitude && location.longitude <= 180.0;
	}
};

const toRadian = (degree) => {
	degree = Number(degree);

	if(degree) {
		return ((degree * Math.PI) / 180);
	} else {
		throw new Error('Value provided is invalid.');
	}
};

const validateArray = (arrayObj) => {
	if(Array.isArray(arrayObj) && arrayObj.length) {
		return true;
	} else {
		throw new Error('Input data format is invalid');
	}
};

const denormalize = (partnersJson) => {
	const denormalizedData = [];

	validateArray(partnersJson) && partnersJson.forEach((partner) => {
		validateArray(partner.offices) && partner.offices.forEach((office) => {
			const coordinateArray = office.coordinates && office.coordinates.split(',');
			const officeCoordinates = {
				latitude: coordinateArray[0],
				longitude: coordinateArray[1],
			};

			denormalizedData.push({
				organization: partner.organization,
				address: office.address,
				coordinates: officeCoordinates,
			});
		});
	});

	return denormalizedData;
};

const vincentyDistance = (location1, location2) => {
	if (!validateLocation(location1)) {
		throw new Error(`co-ordinates ${location1.latitude}, ${location1.longitude} are invalid location`);
	}
	if (!validateLocation(location2)) {
		throw new Error(`co-ordinates ${location2.latitude}, ${location2.longitude} are invalid location`);
	}

	const latitude1 = toRadian(location1.latitude);
	const longitude1 = toRadian(location1.longitude);
	const latitude2 = toRadian(location2.latitude);
	const longitude2 = toRadian(location2.longitude);

	/**
		* TODO: Calculate Vincenty distance.
		* Vincenty formula: Refer: https://en.wikipedia.org/wiki/Great-circle_distance#Computational_formulas
		*
  */

	const deltaLongitude = Math.abs(longitude1 - longitude2);

	const a = Math.cos(latitude2) * Math.sin(deltaLongitude);
	const b1 = Math.cos(latitude1) * Math.sin(latitude2);
	const b2 = Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(deltaLongitude);
	const b = (b1 - b2);
	const c = Math.sin(latitude1) * Math.sin(latitude2);
	const d = Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(deltaLongitude);

	const numerator = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	const denominator = c + d;

	// calculate central angle using arctan.
	const centralAngle = Math.atan2(numerator, denominator);

	const distance = EARTH_RADIUS * centralAngle;
	return distance;
};

const guestList = (partners = data) => {
	const partnerList = [];
	if (!validateLocation(EPICENTER_LOCATION)) {
		throw new Error(`co-ordinates ${EPICENTER_LOCATION.latitude}, ${EPICENTER_LOCATION.longitude} are invalid location`);
	}

	// denormalize partners json for better read.
	const denormalizedJson = denormalize(partners);

	/*
	 * Filter the partners having offices within DISTANCE(100) kms.
	 * NOTE: According to Wikipedia, So long as a spherical Earth is assumed, any single formula for distance on the Earth
	 * is only guaranteed correct within 0.5% (though better accuracy is possible if the formula is only intended to apply to a limited area).
	 * Refer: https://en.wikipedia.org/wiki/Great-circle_distance#
	 * OUR CALCULATION OF DISTANCE MAY HAVE TOLERANCE OF 0.5%
	*/
	let guests = denormalizedJson.filter((partner) => {
		return vincentyDistance(EPICENTER_LOCATION, partner.coordinates) <= 1.005 * DISTANCE;
	});

	// sort the organization name in ascending order.
	guests = guests && guests.sort((a, b) => {
		const organizationA = a.organization.toLowerCase();
		const organizationB = b.organization.toLowerCase();
		return organizationA.localeCompare(organizationB); // It will give -1, 0, 1.
	});
	return guests;
};

export {
	validateLocation,
	toRadian,
	denormalize,
	vincentyDistance,
	guestList,
};
