import Weather from "./Weather";

const Country = ({ countryData }) => {

	return (
		<div>
			<h1>{countryData.name.common}</h1>
			<p>Capital {countryData.capital}</p>
			<p>Area {countryData.area}</p>
			<h2>Languages</h2>
			<ul>
				{Object.values(countryData.languages).map((language) => (
					<li key={language}id={language}>{language}</li>
				))}
			</ul>
			<img
				src={countryData.flags.png}
				alt="Flag"
				style={{ height: '120px', paddingBottom: '20px'}}
			/>
			<Weather lat={countryData.latlng[0]} lon={countryData.latlng[1]}/>
		</div>
	);
};

export default Country;
