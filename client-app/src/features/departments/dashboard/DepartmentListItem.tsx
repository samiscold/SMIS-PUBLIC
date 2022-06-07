import { SyntheticEvent, useState } from "react";
import { ListGroup, Col, Badge, Button, Spinner } from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
import { Department } from "../../../app/models/department";
import { useStore } from "../../../app/stores/store";

interface Props {
    department: Department;
}

export default function DepartmentListItem({ department }: Props) {
    const {departmentStore} = useStore();
    const history = useHistory();
    const { deleteDepartment, loading } = departmentStore;

    const [target, setTarget] = useState('');

    function handleDepartmentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteDepartment(id).then(() => history.push(`/departments`));;
    }
    
    return (
        <ListGroup.Item key={department.id} className="d-flex justify-content-between align-items-center">
            <Col xs="9" className="d-flex justify-content-around align-items-center">
                <Col xs="8">
                    <Col xs="4">
                        <Badge bg="secondary" pill className="float-start">
                            {department.departmentCode}
                        </Badge>
                    </Col>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{department.name}</div>
                    </div>
                </Col>
            </Col>
            <Link to={`/manage/${department.id}`}><Button variant="primary">Edit</Button></Link>
            <Button name={department.id} onClick={(e) => handleDepartmentDelete(e, department.id)} variant="danger">
                {loading && target === department.id ? <Spinner
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