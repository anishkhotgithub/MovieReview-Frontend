import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Logout } from "../redux/user/user-action";
import { useDispatch } from "react-redux";
function NavbarLink() {
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	navigate("/movielist", { replace: true });
	// }, []);
	return (
		<Navbar collapseOnSelect expand="lg" className="bg-body-black">
			<Container>
				<Navbar.Brand href="#home">Movie Review</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/movielist">
							Movies
						</Nav.Link>
						{/* <Nav.Link href="/LoginRegister" onClick={dispatch(Logout)}>
							Logout
						</Nav.Link> */}
						{/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
					<Nav>
						<Nav.Link href="/LoginRegister" onClick={dispatch(Logout)}>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarLink;
