import { observer } from "mobx-react-lite";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
    const {countryStore} = useStore();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="home-navbar">
            <Container>
                <Navbar.Brand href="#home">SMIS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#countries">Countries</Nav.Link>
                        <Button variant="success" onClick={() => countryStore.openForm()}>Create Country</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})