import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
    const name = localStorage.getItem("name");
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home"><img src="/images/pikachu.png" alt="Pokearc Logo" width={50}/> PokeArc</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/features" className="nav-link">Features</NavLink>
                    <NavLink to="/pricing" className="nav-link">Pricing</NavLink>
                </Nav>
                <Navbar.Text className="justify-contend-end">
                    Signed in as: <Link to="/login">{name}<span className="text-decoration-none"> <img src="/images/logout.png" width={25} alt="Logout"/></span></Link>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}