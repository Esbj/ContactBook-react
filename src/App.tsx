import { useEffect, useState } from 'react'
import './App.css'
import ContactInfo from './ContactInfo/ContactInfo'
export type Contact = {
  name: string,
  adress: string,
  email: string,
  phone: string
}
function App() {

  const [contacts, setContacts] = useState(Array<Contact>)
  useEffect(() => {
    fetch("http://localhost:3000/contacts")
      .then(res => res.json())
      .then(data => {
        setContacts(data)
      })
  }, [])
  return (
    <div className='contact-list'>
      {
        contacts.map((contact, i) => {
          return <ContactInfo key={i} contact={contact} />
        })
      }
    </div>
  )
}

export default App
