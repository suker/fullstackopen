const Filter = ({ filterProps }) => {
	const [filterContact, setFilterContact] = filterProps;
	return (
		<input
			value={filterContact}
			onChange={(e) => setFilterContact(e.target.value)}
		/>
	);
};

export default Filter;
