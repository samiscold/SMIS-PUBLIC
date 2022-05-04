import { ChangeEvent, useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { Country } from "../../../app/models/country";

interface Props {
    closeForm: () => void;
    country: Country | undefined;
    createOrEdit: (country: Country) => void;
}

export default function CountryForm({ closeForm, country: selectedCountry, createOrEdit }: Props) {

    const initialState = selectedCountry ?? {
        id: '',
        name: '',
        countryCode: ''
    }

    const [country, setCountry] = useState(initialState);
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setCountry({...country, [name]: value});
    }

    function handleSubmit() {
        createOrEdit(country);
    }

    return (
        <Form onSubmit={handleSubmit} autoComplete='off' className="border border-1 p-5">
            <p className="text-muted mb-3">
                Fields marked with <b>*</b> are mandatory.
            </p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="float-start">Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={country.name} name="name" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="float-start">Country Code *</Form.Label>
                <Form.Control type="text" placeholder="Enter country code" value={country.countryCode} name="countryCode" onChange={handleInputChange} />
            </Form.Group>
            <ButtonToolbar className="float-end">
                <ButtonGroup className="me-2">
                    <Button onClick={closeForm} variant="secondary" type="button">
                        Cancel
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </Form>
    )
}