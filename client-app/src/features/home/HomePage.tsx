import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage () {
    return (
        <div className="masthead text-white">
            <Container>
                <h1 className="mb-5">SMIS</h1>
                <h2 className="mb-4">Welcome to Student Management Information System!</h2>
                <Link to='/countries'>
                    <Button variant="btn btn-outline-light">
                        Continue
                    </Button>
                </Link>
            </Container>
        </div>
    )
}