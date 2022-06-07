import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import DepartmentList from "./DepartmentList";

export default observer(function DepartmentDashboard() {
    const { departmentStore } = useStore();
    const {loadDepartments, departmentRegistry} = departmentStore;

    useEffect(() => {
        if (departmentRegistry.size <= 1) loadDepartments();
    }, [loadDepartments, departmentRegistry.size]);

    if (departmentStore.loadingInitial) return <LoadingComponent content='Loading app ...' />;

    return (
        <Row>
            <Col xs="6">
                <DepartmentList />
            </Col>
        </Row>
    )
})