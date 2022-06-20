import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import SubjectList from "./SubjectList";

export default observer(function SubjectDashboard() {
    const { subjectStore } = useStore();
    const {loadSubjects, subjectRegistry} = subjectStore;

    useEffect(() => {
        if (subjectRegistry.size <= 1) loadSubjects();
    }, [loadSubjects, subjectRegistry.size]);

    if (subjectStore.loadingInitial) return <LoadingComponent content='Loading app ...' />;

    return (
        <Row>
            <Col xs="6">
                <SubjectList />
            </Col>
        </Row>
    )
}) 