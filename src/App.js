import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import Container from './components/Container/Container'
import Phonebook from './components/Phonebook/Phonebook'
import Contacts from './components/Contacts/Contacts'
import Filter from './components/Filter/Filter'
import { getFromLocal, addSaveLocal } from './utilits/localStorage'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getFromLocal('contacts', contacts)
  }, [contacts])

  useEffect(() => {
    const addSaveContacts = addSaveLocal('contacts')
    if (addSaveContacts) {
      setContacts(addSaveContacts)
    }
  }, [])

  const addContact = (name, number) => {
    if (onCheck(name)) {
      alert(`${name} is already in contacts`)
      return
    }
    const obj = { id: uuidv4(), name, number }
    setContacts([...contacts, obj])
  }

  const onCheck = (value) => {
    return contacts.find((el) => el.name.toUpperCase() === value.toUpperCase())
  }

  const deleteContacts = (id) => {
    setContacts(contacts.filter((el, index) => el.id !== id))
  }
  const filterContacts = (value, arr) => {
    const filterContactsMethod = value
      .filter((contact) => contact.name.toLowerCase().includes(arr))
      .sort((a, b) => a.name.localeCompare(b.name))
    return filterContactsMethod
  }
  return (
    <div className="App">
      <Container title="Phonebook">
        <Phonebook onAddContact={addContact} />
      </Container>
      <Container title="Contacts">
        {contacts.length >= 2 && (
          <Filter filter={filter} onFilter={setFilter} />
        )}
        <Contacts
          listContacts={filterContacts(contacts, filter)}
          onDelete={deleteContacts}
        />
      </Container>
    </div>
  )
}
