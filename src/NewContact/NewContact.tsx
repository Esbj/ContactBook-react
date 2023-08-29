import React, { useState } from 'react'
import { Contact } from '../App'
import './NewContact.scss'
type Props = {
  createContact: (contact: Contact) => void
}
export default function NewContact({ createContact }: Props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [adress, setAdress] = useState("")
  const [email, setEmail] = useState("")
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact: Contact = {
      adress: adress,
      email: email,
      id: Date.now(),
      name: name,
      phone: phone
    }
    createContact(newContact)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newName">👤</label>
      <input name="newName" id='newName' value={name} onChange={(e) => setName(e.target.value)} type="text" />
      <label htmlFor="newPhone">📞</label>
      <input id='newPhone' value={phone} onChange={(e) => setPhone(e.target.value)} type="text" />
      <label htmlFor="newEmail">✉️</label>
      <input id='newEmail' value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
      <label htmlFor="newAdress">🏠</label>
      <input id='newAdress' value={adress} onChange={(e) => setAdress(e.target.value)} type="text" />
      <button type='submit' >Save</button>
    </form>
  )
}
