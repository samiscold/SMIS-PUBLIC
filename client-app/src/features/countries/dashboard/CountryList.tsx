import { Badge, Button, Col, ListGroup } from "react-bootstrap";
import { Country } from "../../../app/models/country"

interface Props {
    countries: Country[];
    selectCountry: (id: string) => void;
    openForm: (id: string) => void;
    deleteCountry: (id: string) => void;
}

export default function CountryList({ countries, selectCountry, openForm, deleteCountry }: Props) {
    return (
        <ListGroup>
            {countries.map(country => (
                <ListGroup.Item key={country.id} className="d-flex justify-content-between align-items-center">
                    <Col xs="9" className="d-flex justify-content-around align-items-center">
                        <Col xs="8">
                            <Col xs="4">
                                <Badge bg="secondary" pill className="float-start">
                                    {country.countryCode}
                                </Badge>
                            </Col>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{country.name}</div>
                            </div>
                        </Col>
                    </Col>
                    <Button onClick={() => openForm(country.id)} variant="primary">Edit</Button>
                    <Button onClick={() => deleteCountry(country.id)} variant="danger">Delete</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}