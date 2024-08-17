import { useState } from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
	const [showCountry, setShowCountry] = useState(Array(10).fill(false));

	const displayCountryInfo = (idx) => {
		const newValues = showCountry.map((country, i) =>
			i === idx ? !country : country
		);
		setShowCountry(newValues);
	};

	// Display a single country info
	if (countries.length === 1) {
		return <Country countryData={countries[0]} />;
	}

	// when multiple countries has to been displayed
	return (
		<ul>
			{countries.map((country, idx) => (
				<li
					key={country.ccn3}
					id={country.ccn3}
				>
					{country.name.common}
                <button onClick={() => displayCountryInfo(idx)}>
						{showCountry[idx] ? 'hide' : 'show'}
					</button>
				{showCountry[idx] && <Country countryData={country} />}
				</li>
			))}
		</ul>
	);
};

export default Countries;
