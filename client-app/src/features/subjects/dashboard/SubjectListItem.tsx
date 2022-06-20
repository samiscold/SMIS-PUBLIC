import { SyntheticEvent, useState } from "react";
import { ListGroup, Col, Badge, Button, Spinner } from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
import { Subject } from "../../../app/models/subject";
import { useStore } from "../../../app/stores/store";

interface Props {
    subject: Subject;
}

export default function SubjectListItem({ subject }: Props) {
    const {subjectStore} = useStore();
    const history = useHistory();
    const { deleteSubject, loading } = subjectStore;

    const [target, setTarget] = useState('');

    function handleSubjectDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteSubject(id).then(() => history.push(`/subjects`));;
    }

    return (
        <ListGroup.Item key={subject.id} className="d-flex justify-content-between align-items-center">
            <Col xs="9" className="d-flex justify-content-around align-items-center">
                <Col xs="8">
                    <Col xs="4">
                        <Badge bg="secondary" pill className="float-start">
                            {subject.ects}
                        </Badge>
                    </Col>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{subject.name}</div>
                    </div>
                </Col>
            </Col>
            <Link to={`/manage-subject/${subject.id}`}><Button variant="primary">Edit</Button></Link>
            <Button name={subject.id} onClick={(e) => handleSubjectDelete(e, subject.id)} variant="danger">
                {loading && target === subject.id ? <Spinner
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