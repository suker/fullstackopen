import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addContact = (e) => {
    e.preventDefault()
    const newPerson = {
        name: newName,
    }
    const repeatedName = persons.find((person) => JSON.stringify(
        person) === JSON.stringify(newPerson))

    if (repeatedName) {
        alert(`${newPerson.name} is already added to phonebook`)
        return 
    }
    setPersons([...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App;