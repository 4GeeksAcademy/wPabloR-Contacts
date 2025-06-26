import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between p-1 mb-2">
					<h2 className="text-start mt-2">Contact List</h2>
					<Link to="/demo" className="btn btn-success mt-2">
						➕ Add New Contact
					</Link>
			</div>
		</nav>
	);
};