import { useEffect, useState } from 'react'
import './App.css'
import ContactInfo from './ContactInfo/ContactInfo'

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

  const getContacts = () => {
    fetch("http://localhost:3000/contacts")
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
  useEffect(() => {
    getContacts()
  }, [])
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

    </>
  )
}

export default App
