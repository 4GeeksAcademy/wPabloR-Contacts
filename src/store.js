export const initialStore = () => {
  return {
    contacts: [],
    emptyContact: {
      name: "",
      email: "",
      phone: "",
      address: ""
    }
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_contact':{

    const {contactList} = action.payload
      return {
        ...store,
        contacts: contactList
      }
    }
      case 'delete_contact':{

      const {id} = action.payload
        return {
          ...store,
          contacts: store.contacts.filter(contact => contact.id !== id)
        }
      }  

      case 'add_contact':{
        const {newContact} = action.payload

        return {
          ...store,
          contacts: [...store.contacts, newContact],
          emptyContact:  { name: "", email: "", phone: "", address: "" }

        }
      }

      case 'manage_input':{
        const {name, value} = action.payload

        return{
          ...store,
          emptyContact: {
            ...store.emptyContact,
            [name] : value
          }
        }
      }

      case 'set_edit_contact':{
        return{
          ...store,
          emptyContact: action.payload
        }
      }

      case 'edit_contact':{
        const {editedContact} = action.payload

        return {
          ...store,
          contacts: store.contacts.map(contact => 
            contact.id === editedContact.id ? editedContact : contact
          ),
          emptyContact:  { name: "", email: "", phone: "", address: "" }
        }
      }

    default:
      throw Error('Unknown action.');
  }
}
