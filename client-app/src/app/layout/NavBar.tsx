import { Navbar, Container, Nav, Button } from "react-bootstrap";

interface Props {
    openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="home-navbar">
            <Container>
                <Navbar.Brand href="#home">SMIS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#countries">Countries</Nav.Link>
                        <Button variant="success" onClick={() => openForm()}>Create Country</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}