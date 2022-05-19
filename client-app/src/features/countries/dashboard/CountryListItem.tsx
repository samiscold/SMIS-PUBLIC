import { SyntheticEvent, useState } from "react";
import { ListGroup, Col, Badge, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Country } from "../../../app/models/country";
import { useStore } from "../../../app/stores/store";

interface Props {
    country: Country;
}

export default function CountryListItem({ country }: Props) {
    const {countryStore} = useStore();
    const { deleteCountry, loading } = countryStore;

    const [target, setTarget] = useState('');

    function handleCountryDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteCountry(id);
    }
    
    return (
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
            <Link to={`/manage/${country.id}`}><Button variant="primary">Edit</Button></Link>
            <Button name={country.id} onClick={(e) => handleCountryDelete(e, country.id)} variant="danger">
                {loading && target === country.id ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /> : 'Delete'}
            </Button>
        </ListGroup.Item>
    )
}