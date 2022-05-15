import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage () {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>Home Page</h1>
            <h3>Go to <Link to='/countries'>Countries</Link></h3>
        </Container>
    )
}