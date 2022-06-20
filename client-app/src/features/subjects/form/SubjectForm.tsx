import { observer } from "mobx-react-lite";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar, Spinner } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function SubjectForm() {
    const history = useHistory();
    const {subjectStore} = useStore();
    const { createSubject, updateSubject, loading, loadSubject, setLoadingInitial, loadingInitial } = subjectStore;
    const {id} = useParams<{id: string}>();

    const [subject, setSubject] = useState({
        id: '',
        name: '',
        ects: ''
    });

    useEffect(() => {
        if (id) loadSubject(id).then(subject => setSubject(subject!));
        else setLoadingInitial(false);
    }, [id, loadSubject, setLoadingInitial]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setSubject({ ...subject, [name]: value });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (subject.id.length === 0) {
            let newSubject = {
                ...subject,
                id: uuid()
            };
            createSubject(newSubject).then(() => history.push(`/subjects`));
        } else {
            updateSubject(subject).then(() => history.push(`/subjects`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading subject ...' />;

    return (
        <Form onSubmit={(e) => handleSubmit(e)} autoComplete='off' className="border border-1 p-5">
            <p className="text-muted mb-3">
                Fields marked with <b>*</b> are mandatory.
            </p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="float-start">Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={subject.name} name="name" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="float-start">ECTS *</Form.Label>
                <Form.Control type="text" placeholder="Enter ECTS" value={subject.ects} name="ects" onChange={handleInputChange} />
            </Form.Group>
            <ButtonToolbar className="float-end">
                <ButtonGroup className="me-2">
                    <Link to='/subjects'><Button variant="secondary" type="button">
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