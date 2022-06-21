import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage () {
    return (
        <div className="masthead text-white">
            <Container>
            <img
                    alt="ubt-logo"
                    src={require('../../app/images/ubt-logo.png')}
                    width="60"
                    height="60"
                    className="d-inline-block"
                    />

                <h1 className="mb-2">SMIS</h1>
               
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