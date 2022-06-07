import { observer } from "mobx-react-lite";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar, Spinner } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function DepartmentForm() {
    const history = useHistory();
    const {departmentStore} = useStore();
    const { createDepartment, updateDepartment, loading, loadDepartment, setLoadingInitial, loadingInitial } = departmentStore;
    const {id} = useParams<{id: string}>();

    const [department, setDepartment] = useState({
        id: '',
        name: '',
        departmentCode: ''
    });

    useEffect(() => {
        if (id) loadDepartment(id).then(department => setDepartment(department!));
        else setLoadingInitial(false);
    }, [id, loadDepartment, setLoadingInitial]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setDepartment({ ...department, [name]: value });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (department.id.length === 0) {
            let newDepartment = {
                ...department,
                id: uuid()
            };
            createDepartment(newDepartment).then(() => history.push(`/departments`));
        } else {
            updateDepartment(department).then(() => history.push(`/departments`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading department ...' />;

    return (
        <Form onSubmit={(e) => handleSubmit(e)} autoComplete='off' className="border border-1 p-5">
            <p className="text-muted mb-3">
                Fields marked with <b>*</b> are mandatory.
            </p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="float-start">Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={department.name} name="name" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="float-start">Department Code *</Form.Label>
                <Form.Control type="text" placeholder="Enter department code" value={department.departmentCode} name="departmentCode" onChange={handleInputChange} />
            </Form.Group>
            <ButtonToolbar className="float-end">
                <ButtonGroup className="me-2">
                    <Link to='/departments'><Button variant="secondary" type="button">
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