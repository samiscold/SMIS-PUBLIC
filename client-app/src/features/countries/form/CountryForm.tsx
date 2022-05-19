import { observer } from "mobx-react-lite";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar, Spinner } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function CountryForm() {
    const history = useHistory();
    const {countryStore} = useStore();
    const { createCountry, updateCountry, loading, loadCountry, setLoadingInitial, loadingInitial } = countryStore;
    const {id} = useParams<{id: string}>();

    const [country, setCountry] = useState({
        id: '',
        name: '',
        countryCode: ''
    });

    useEffect(() => {
        if (id) loadCountry(id).then(country => setCountry(country!));
        else setLoadingInitial(false);
    }, [id, loadCountry, setLoadingInitial]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setCountry({ ...country, [name]: value });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (country.id.length === 0) {
            let newCountry = {
                ...country,
                id: uuid()
            };
            createCountry(newCountry).then(() => history.push(`/countries`));
        } else {
            updateCountry(country).then(() => history.push(`/countries`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading country ...' />;

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
                    <Link to='/countries'><Button variant="secondary" type="button">
                        Cancel
                    </Button></Link>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="success" type="submit">
                        {loading ? <Spinner
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
})