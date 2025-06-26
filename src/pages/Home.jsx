import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

  useEffect(()=>{
	fetch("https://playground.4geeks.com/contact/agendas/ronaldo/contacts")
	.then(resp => resp.json())
	.then(data => {
		dispatch({
			type: "load_contact", 
			payload: {contactList: data.contacts}
		});
	})

  },[])

  const deleteContact = (id) =>{
	console.log("borrar contacto");
	fetch(`https://playground.4geeks.com/contact/agendas/ronaldo/contacts/${id}`, {
		method: 'DELETE',
		})
		.then(() => {
			dispatch({
				type: 'delete_contact',
				payload: {id}
			})
		})
		.catch(error => console.error("Error al borrar el contacto", error))
	
  }

	return (
		<div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-start">Contact List</h2>
        <Link to="/demo" className="btn btn-success">
          ➕ Add New Contact
        </Link>
      </div>

      {store.contacts.length === 0 ? (
        <p className="text-center text-muted">No contacts yet</p>
      ) : (
        store.contacts.map((contact) => (
          <div className="card mb-3 shadow-sm" key={contact.id}>
            <div className="row g-0 align-items-center">
              <div className="col-md-2 text-center">
                <img
                  src="https://picsum.photos/100"
                  className="img-fluid rounded-circle m-3"
                  alt="Avatar"
                />
              </div>

              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title mb-1">{contact.name}</h5>
                  <p className="card-text mb-1">📍 {contact.address}</p>
                  <p className="card-text mb-1">📞 {contact.phone}</p>
                  <p className="card-text mb-0">✉️ {contact.email}</p>
                </div>
              </div>

              <div className="col-md-2 text-end pe-3">
                <button
                  className="btn btn-sm btn-outline-danger me-2"
                  onClick={() => deleteContact(contact.id)}
                >
                  🗑️
                </button>
                <button className="btn btn-sm btn-outline-primary">
                  ✏️
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
	);
}; 
	// 	<div className="text-center mt-5">
	// 	<div className="list-group">
    //     {store && store.contacts.map((item) => {
    //       return (
    //         <div key={item.id}> 
	// 		<h3>Name: {item.name}</h3>
	// 		<p>ID: {item.id}</p>
	// 		<p>Phone: {item.phone} </p>
    //           <button onClick={() => deleteContact(item.id)}>Delete</button>
	// 		</div>
    //       );
    //     })}
    //   </div>
	// 	</div>