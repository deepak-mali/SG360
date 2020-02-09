export const correctData = [
	{
		id: 1,
		urlName: 'balance-at-work',
		organization: 'Balance at Work',
		customerLocations: 'across Australia, Pacific and Oceania',
		willWorkRemotely: true,
		website: 'http://www.balanceatwork.com.au/',
		services: 'At Balance at Work, we want to help you make work a joy for your employees and you!',
		offices: [
			{
				location: 'Sydney, Australia',
				address: 'Suite 1308, 109 Pitt St \nSydney 2000',
				coordinates: '-33.8934219,151.20404600000006',
			},
		],
	},
	{
		id: 2,
		urlName: 'spring-development',
		organization: 'Spring Development',
		customerLocations: 'across the UK',
		willWorkRemotely: true,
		website: 'http://www.springdevelopment.net/',
		services: 'We provide training, coaching and consultancy to ensure that 360 feedback is delivered positively and constructively.',
		offices: [
			{
				location: 'Banbury, Oxfordshire',
				address: 'Banbury, Oxfordshire',
				coordinates: '52.0629009,-1.3397750000000315',
			},
		],
	},
];

export const inCorrectData = [
	{
		id: 1,
		urlName: 'balance-at-work',
		organization: 'Balance at Work',
		customerLocations: 'across Australia, Pacific and Oceania',
		willWorkRemotely: true,
		website: 'http://www.balanceatwork.com.au/',
		services: 'At Balance at Work, we want to help you make work a joy for your employees and you!',
		offices: [
			{
				location: 'Sydney, Australia',
				address: 'Suite 1308, 109 Pitt St \nSydney 2000',
				coordinates: '-33.8934219 151.20404600000006',
			},
		],
	},
	{
		id: 2,
		urlName: 'spring-development',
		organization: 'Spring Development',
		customerLocations: 'across the UK',
		willWorkRemotely: true,
		website: 'http://www.springdevelopment.net/',
		services: 'We provide training, coaching and consultancy to ensure that 360 feedback is delivered positively and constructively.',
	},
];

export const denormalizedCorrectData = [
	{
		organization: 'Balance at Work',
		address: 'Suite 1308, 109 Pitt St \nSydney 2000',
		coordinates: {
			latitude: '-33.8934219',
			longitude: '151.20404600000006',
		},
	},
	{
		organization: 'Spring Development',
		address: 'Banbury, Oxfordshire',
		coordinates: {
			latitude: '52.0629009',
			longitude: '-1.3397750000000315',
		},
	},
];

export const defaultGuestList = [
	{
		organization: 'Blue Square 360',
		address: 'St Saviours Wharf, London SE1 2BE',
		coordinates: { latitude: 51.5014767, longitude: -0.0713608999999451 }
	},
	{
		organization: 'Gallus Consulting',
		address: 'Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG',
		coordinates: { latitude: 52.277409, longitude: -0.877935999999977 }
	},
	{
		organization: 'Gallus Consulting',
		address: 'No1 Royal Exchange, London, EC3V 3DG',
		coordinates: { latitude: 51.5136102, longitude: -0.08757919999993646 }
	},
];
