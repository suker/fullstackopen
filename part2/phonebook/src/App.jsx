import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: '738421201',
		},
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterContact, setFilterContact] = useState('');

	const addContact = (e) => {
		e.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
		};
		const repeatedName = persons.find(
			(person) => JSON.stringify(person) === JSON.stringify(newPerson)
		);

		if (repeatedName) {
			alert(`${newPerson.name} is already added to phonebook`);
			return;
		}
		setPersons([...persons, newPerson]);
		setNewName('');
		setNewNumber('');
	};

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filterContact.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			Filter shown with
			<input
				value={filterContact}
				onChange={(e) => setFilterContact(e.target.value)}
			/>
			<h2>Add a new contact</h2>
			<form onSubmit={addContact}>
				<div>
					name:{' '}
					<input
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
				</div>
				<div>
					number:{' '}
					<input
						value={newNumber}
						onChange={(e) => setNewNumber(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{filteredPersons.map((person) => (
					<li key={person.name}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
