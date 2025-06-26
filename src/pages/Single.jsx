
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Single = () => {

  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  const { theId } = useParams()
  const singleContact = store.contacts.find(contact => contact.id === parseInt(theId));

  useEffect(() => {
    if(singleContact){
      dispatch({
        type: 'set_edit_contact',
        payload: singleContact
      })
    }
  }, [singleContact])

  const handleInput = (e) => {
    const {name, value } = e.target;
    dispatch({
      type: 'manage_input',
      payload: {name, value}
    })
  }

  const editContact = (e) => {
    e.preventDefault();

    fetch(`https://playground.4geeks.com/contact/agendas/ronaldo/contacts/${theId}`, {
      method: 'PUT',
      body: JSON.stringify(store.emptyContact),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: 'edit_contact',
          payload: { editedContact: data }
        });
        navigate("/")
      })
      .catch(error => console.error("Error editando contacto", error))
  }

  return (
    <div className="container py-4">
      <h1 className="ms-2 fw-bold">Add a new contact</h1>
      <form action="" onSubmit={editContact} className="border rounded-3 p-3 mt-4 shadow-sm bg-light">
        <div className="mb-2">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input className="form-control" type="text" placeholder="Full Name" name="name" id="name" value={store.emptyContact.name} onChange={handleInput} />
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-control" type="text" placeholder="Enter email" name="email" id="email" value={store.emptyContact.email} onChange={handleInput} />
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input className="form-control" type="text" placeholder="Enter phone" name="phone" id="phone" value={store.emptyContact.phone} onChange={handleInput} />
        </div>

        <div className="mb-0">
          <label className="form-label" htmlFor="address">Adress</label>
          <input className="form-control" type="text" placeholder="Enter address" name="address" id="address" value={store.emptyContact.address} onChange={handleInput} />
        </div>

        <div className="mt-4">
          <button className="btn btn-primary me-4" style={{ width: "200px" }}>Save</button>
          <button className="btn btn-danger" type="button" style={{ width: "200px" }} onClick={() => navigate("/")}>Back</button>

        </div>
      </form>

    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};
