import { observer } from "mobx-react-lite";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
    const {countryStore} = useStore();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="home-navbar">
            <Container>
                <Navbar.Brand as={NavLink} to='/' exact >SMIS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to='/countries'>Countries</Nav.Link>
                        <NavLink to='/createCountry'><Button variant="success btn-sm" >Create Country</Button></NavLink>
                        <Nav.Link as={NavLink} to='/departments'>Departments</Nav.Link>
                        <NavLink to='/createDepartment'><Button variant="success btn-sm" >Create Departments</Button></NavLink>
                        <Nav.Link as={NavLink} to='/subjects'>Subjects</Nav.Link>
                        <NavLink to='/createSubject'><Button variant="success btn-sm" >Create Subject</Button></NavLink>   
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})