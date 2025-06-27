
import useGlobalReducer from "../hooks/useGlobalReducer";  
import { useNavigate } from "react-router-dom";


export const AddContact = () => {
 
  const { store, dispatch } = useGlobalReducer()
  const input = store.emptyContact;
  const navigate = useNavigate()

  const handleInput = (e) => {
    dispatch({
      type: 'manage_input',
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    })
  }

const addContact = (e) => {
  e.preventDefault();

  fetch("https://playground.4geeks.com/contact/agendas/ronaldo/contacts", {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
        "Content-Type": "application/json"
      }
  })
  .then(resp => resp.json())
  .then(data => {
    dispatch({
      type: 'add_contact',
      payload: {newContact: data}
    });
    navigate("/")
  })
  .catch(error => console.error("Error al añadir contacto", error))
}

return (
    <div className="container py-4">
      <h1 className="ms-2 fw-bold">Add a new contact</h1>
      <form action="" onSubmit={addContact} className="border rounded-3 p-3 mt-4 shadow-sm bg-light">
        <div className="mb-2">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input className="form-control" type="text" placeholder="Full Name" name="name" id="name" value={input.name} onChange={handleInput} />
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-control" type="text" placeholder="Enter email" name="email" id="email" value={input.email} onChange={handleInput} />
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input className="form-control" type="text" placeholder="Enter phone" name="phone" id="phone" value={input.phone} onChange={handleInput} />
        </div>

        <div className="mb-0">
          <label className="form-label" htmlFor="address">Adress</label>
          <input className="form-control" type="text" placeholder="Enter address" name="address" id="address" value={input.address} onChange={handleInput} />
        </div>

        <div className="mt-4">
          <button className="btn btn-primary me-4" style={{ width: "200px" }}>Save</button>
          <button className="btn btn-danger" style={{ width: "200px" }} onClick={()=>navigate("/")}>Back</button>

        </div>
      </form>

    </div>
  );
};
