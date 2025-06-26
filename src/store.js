export const initialStore = () => {
  return {
    contacts: [],
    newContact: {
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
          newContact:  { name: "", email: "", phone: "", address: "" }

        }
      }

      case 'manage_input':{
        const {name, value} = action.payload

        return{
          ...store,
          newContact: {
            ...store.newContact,
            [name] : value
          }
        }
      }

    default:
      throw Error('Unknown action.');
  }
}
