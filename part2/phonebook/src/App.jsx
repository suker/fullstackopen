import { useState } from 'react';

const Filter = ({ filterProps }) => {
    const [filterContact, setFilterContact] = filterProps
    return (
        <input
        value={filterContact}
        onChange={(e) => setFilterContact(e.target.value)}
    />
    )
}

const PersonForm = ({ formProps }) => {
	const [addContact, newName, setNewName, newNumber, setNewNumber] =
		formProps;
	return (
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
	);
};

const Persons = ({ persons }) => {
	// console.log('filtered Persons: ', persons);
	return (
		<ul>
			{persons.map((person) => (
				<li key={person.name}>
					{person.name} {person.number}
				</li>
			))}
		</ul>
	);
};

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
      ])
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
			<Filter filterProps={[filterContact, setFilterContact]}/>
			<h2>Add a new contact</h2>
			<PersonForm
				formProps={[
					addContact,
					newName,
					setNewName,
					newNumber,
					setNewNumber,
				]}
			/>
			<h3>Numbers</h3>
			<Persons persons={filteredPersons} />
		</div>
	);
};

export default App;
