import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Logout } from "../redux/user/user-action";
import { useDispatch } from "react-redux";

function AdminNavbarLink() {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	navigate("/movies", { replace: true });
	// }, []);
	return (
		<Navbar collapseOnSelect expand="lg" className="">
			<Container>
				<Navbar.Brand>AdminPanel</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/movies">
							Movies List
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link as={Link} to="/login" onClick={() => dispatch(Logout())}>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default AdminNavbarLink;
