import { useEffect } from 'react';
import axios from 'axios';

const COUNTRY_API = 'https://studies.cs.helsinki.fi/restcountries/api/name';

export const useCountry = (name) => {
	let country = {};
	useEffect(async () => {
		const response = await axios.get(`${COUNTRY_API}/${name}`);
		country = response.data;
		console.log(country);
	}, [name]);

	return {
		country,
	};
};
