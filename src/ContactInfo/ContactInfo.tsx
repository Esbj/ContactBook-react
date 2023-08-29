import { Contact } from "../App"
import { useReducer, useState } from 'react'
import "./ContactInfo.scss"
type ContactInfoProps = {
  contact: Contact
}
type State = {
  name: string,
  address: string,
  email: string,
  phone: string
};

enum ActionTypes {
  SET_NAME = "SET_NAME",
  SET_ADDRESS = "SET_ADDRESS",
  SET_EMAIL = "SET_EMAIL",
  SET_PHONE = "SET_PHONE"
}

type Action =
  | { type: ActionTypes.SET_NAME, payload: string }
  | { type: ActionTypes.SET_ADDRESS, payload: string }
  | { type: ActionTypes.SET_EMAIL, payload: string }
  | { type: ActionTypes.SET_PHONE, payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case ActionTypes.SET_ADDRESS:
      return { ...state, address: action.payload };
    case ActionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionTypes.SET_PHONE:
      return { ...state, phone: action.payload };
    default:
      throw new Error("Unexptected action type");
  }
}


export default function ContactInfo({ contact }: ContactInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const initialState: State = {
    name: contact.name,
    address: contact.adress,
    email: contact.email,
    phone: contact.phone
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(!isEditing)
  };
  return (
    <>
      {isEditing ?
        <form onSubmit={handleSubmit} className="edit-contact">
          <label htmlFor="name">👤</label>
          <input value={state.name} type="text" name="name" id="name" onChange={(e) => dispatch({ type: ActionTypes.SET_NAME, payload: e.target.value })} />
          <label htmlFor="phone">📞</label>
          <input value={state.phone} type="text" name="phone" id="phone" onChange={(e) => dispatch({ type: ActionTypes.SET_PHONE, payload: e.target.value })} />
          <label htmlFor="mail">✉️</label>
          <input value={state.email} type="text" name="mail" id="mail" onChange={(e) => dispatch({ type: ActionTypes.SET_EMAIL, payload: e.target.value })} />
          <label htmlFor="adress">🏠</label>
          <input value={state.address} type="text" name="adress" id="adress" onChange={(e) => dispatch({ type: ActionTypes.SET_ADDRESS, payload: e.target.value })} />
          <button type="submit">Save</button>
        </form>
        :
        <div className="contact-info card">
          <h3>👤 {state.name}</h3>
          <p>📞 {state.phone}</p>
          <p>✉️ {state.email}</p>
          <p>🏠 {state.address}</p>
          <button onClick={() => setIsEditing(true)}>Edit contact</button>
        </div>
      }
    </>

  )
}
