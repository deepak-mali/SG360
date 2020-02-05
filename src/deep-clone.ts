/**
 * @author Deepak Mali <mail2deepakmali@gmail.com>
 * @description - Function to create a deep clone of an object.
 * @param { object } object - Input object.
 * @returns { object } - Cloned object of input object.
 */
export const deepClone = (object: object): object => {
	// Check if input is an object.
	if (!isObject(object)) {
		throw new Error('Input variable is not an object or null');
	}

	let cloneObject = {};

	// Determine if object in an array.
	if (Array.isArray(object)) {
		cloneObject = [];
	}

	for (const key in object) {
		// Prevents accidental iteration over properties inherited from an object’s prototype.
		if (object.hasOwnProperty(key)) {
			const value = object[key];

			// if value is found to be an object, recursively clone it.
			let newValue;
			if (isObject(value)) {
				newValue = deepClone(value);
			} else {
				newValue = value;
			}

			cloneObject[key] = newValue;
		}
	}

	return cloneObject;
};

const isObject = (object) => {
	return object && typeof object === 'object';
};
