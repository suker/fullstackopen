import { useState, useEffect } from 'react';
import { getAll, create } from '../services/services';

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

const baseUrl = 'http://localhost:3001/persons'

const App = () => {
    const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterContact, setFilterContact] = useState('');

	useEffect(()=> {
		// console.log('Effect')
		getAll()
		.then(contacts => {
			console.log(contacts)
			setPersons(contacts)
		})
	}, [])

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

		// método para añadir el nuevo contacto al servidor en el fichero 'db.json'
		create(newPerson)
		.then(newPerson => {
			console.log('this contact has been added', newPerson)
			setPersons([...persons, newPerson]);
			setNewName('');
			setNewNumber('');			
		})
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
