import { SyntheticEvent, useState } from "react";
import { Badge, Button, Col, ListGroup, Spinner } from "react-bootstrap";
import { Country } from "../../../app/models/country"

interface Props {
    countries: Country[];
    selectCountry: (id: string) => void;
    openForm: (id: string) => void;
    deleteCountry: (id: string) => void;
    submitting: boolean;
}

export default function CountryList({ countries, selectCountry, openForm, deleteCountry, submitting }: Props) {
    const [target, setTarget] = useState('');

    function handleCountryDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteCountry(id);
    }

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
                    <Button name={country.id} onClick={(e) => handleCountryDelete(e, country.id)} variant="danger">
                        {submitting && target === country.id ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : 'Delete'}
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}