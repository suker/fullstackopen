import { useState, useEffect } from 'react';
import Search from './components/Search';
import Warning from './components/Warning';
import Services from './services/countries';
import Countries from './components/Countries';

const App = () => {
	const [countryFilter, setCountryFilter] = useState('');
	const [countries, setCountries] = useState([]);
	const [hasExceed, setHasExceed] = useState(false);

	const effectCallback = () => {
		if (!countryFilter) {
			setCountries([])
			return
		}

		Services.getAllCountries().then((countries) => {
			const filteredCountries = countries.filter((country) =>
				country.name.common
					.toLowerCase()
					.includes(countryFilter.toLowerCase())
			);
			if (filteredCountries.length > 10) {
				setHasExceed(true);
				setCountries([]);
				return;
			}
			setCountries(filteredCountries);
			setHasExceed(false);
		});
	};

	useEffect(effectCallback, [countryFilter]);

	return (
		<section>
			<p>Find Countries</p>
			<Search props={{ countryFilter, setCountryFilter }} />
			<Countries countries={countries} />
			{hasExceed && <Warning />}
		</section>
	);
};

export default App;
