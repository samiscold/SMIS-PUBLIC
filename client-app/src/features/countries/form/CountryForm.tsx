import { ChangeEvent, FormEvent, useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar, Spinner } from "react-bootstrap";
import { Country } from "../../../app/models/country";

interface Props {
    closeForm: () => void;
    country: Country | undefined;
    createOrEdit: (country: Country) => void;
    submitting: boolean;
}

export default function CountryForm({ closeForm, country: selectedCountry, createOrEdit, submitting }: Props) {

    const initialState = selectedCountry ?? {
        id: '',
        name: '',
        countryCode: ''
    }

    const [country, setCountry] = useState(initialState);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setCountry({ ...country, [name]: value });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        createOrEdit(country);
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)} autoComplete='off' className="border border-1 p-5">
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
                        {submitting ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : 'Submit'}
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </Form>
    )
}