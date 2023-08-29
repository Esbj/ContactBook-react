import { useEffect, useState } from 'react'
import './App.css'
import ContactInfo from './ContactInfo/ContactInfo'
import NewContact from './NewContact/NewContact'

const apiUrl = "http://localhost:3000/contacts/"
export type Contact = {
  name: string,
  adress: string,
  email: string,
  phone: string
  id: number
}

function App() {
  const [contacts, setContacts] = useState(Array<Contact>)
  const [isAdding, setIsAdding] = useState(false)
  useEffect(() => {
    getContacts()
  }, [])
  const createContact = (contact: Contact) => {
    setIsAdding(false)
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(contact)
    })
      .then(getContacts)

  }
  const getContacts = () => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setContacts(data)
      })
  }
  const saveContacts = (contact: Contact) => {
    fetch(apiUrl + contact.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(contact)
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }
  const removeContact = (contact: Contact) => {
    fetch(apiUrl + contact.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(() => getContacts())
  }

  return (
    <>
      <h1>Contact Book</h1>
      <div className='contact-list'>
        {
          contacts.map((contact, i) => {
            return <ContactInfo key={i} contact={contact} saveContacts={saveContacts} removeContact={removeContact} />
          })
        }
      </div>
      {!isAdding &&
        <button type='button' onClick={() => { setIsAdding(true); console.log("click") }}>
          Add contact
        </button >
      }
      {isAdding && <NewContact createContact={createContact} />
      }
    </>
  )
}

export default App
