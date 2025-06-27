import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { ContactList } from "./pages/ContactList";
import { Single } from "./pages/Single";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter(
    createRoutesFromElements(
    
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        
        <Route path= "/" element={<ContactList />} />
        <Route path="/single/:theId" element={ <Single />} /> 
        <Route path="/add-contact" element={<AddContact />} />
      </Route>
    )
);