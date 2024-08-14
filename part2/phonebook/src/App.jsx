import { useState, useEffect } from 'react';
import {
	getAllPersons,
	createPerson,
	deletePerson,
	updatePerson,
} from '../services/services';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterContact, setFilterContact] = useState('');
	const [message, setMessage] = useState(null)

	useEffect(() => {
		getAllPersons().then((contacts) => {
			setPersons(contacts);
		});
	}, []);

	const addContact = (e) => {
		e.preventDefault();
		const newPerson = {
			name: newName,
			number: newNumber,
		};
		const repeatedContact = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);

		if (repeatedContact) {
			if (
				window.confirm(
					`${repeatedContact.name} is already added to phonebook, replace old number to new one?`
				)
			) {
				updatePerson(repeatedContact.id, newPerson).then(
					(updatedPerson) => {
						// console.log('updatedPerson: ', updatedPerson);
						setPersons(
							persons.map((person) =>
								person.id === repeatedContact.id
									? updatedPerson
									: person
							)
						);
						displayNotification(`${newName} number has changed to ${updatedPerson.number}`)
					}
				);
			}
		} else {
			// método para añadir el nuevo contacto al servidor en el fichero 'db.json'
			createPerson(newPerson).then((newPerson) => {
				// console.log('this contact has been added', newPerson);
				setPersons([...persons, newPerson]);
				displayNotification(`Added ${newName}`)
			});
		}
		setNewName('');
		setNewNumber('');
	};

	const displayNotification = (msg) => {
		setMessage(msg)
		setTimeout(() => {
			setMessage(null)
		}, 2000)
	}

	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filterContact.toLowerCase())
	);

	const handleDeletePerson = (id) => {
		if (window.confirm('Do you really want to delete this contact?')) {
			console.log(`deleting person with id ${id}`);

			deletePerson(id).then((deletedPerson) => {
				console.log(deletedPerson);
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification msg={message}/>
			Filter shown with
			<Filter filterProps={[filterContact, setFilterContact]} />
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
			<Persons
				persons={filteredPersons}
				onDeletePerson={handleDeletePerson}
			/>
		</div>
	);
};

export default App;
