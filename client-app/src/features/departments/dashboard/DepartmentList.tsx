import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import DepartmentListItem from "./DepartmentListItem";

export default observer(function DepartmentList() {
    const { departmentStore } = useStore();
    const { groupedDepartments } = departmentStore;

    return (
        <>
            {groupedDepartments.map(([group, departments]) => (
                <Fragment key={group}>
                    <h5 className="text-primary text-start ps-3">
                        {group}
                    </h5>
                    <ListGroup className="pb-4">
                        {departments.map(department => (
                            <DepartmentListItem key={department.id} department={department} />
                        ))}
                    </ListGroup>
                </Fragment>
            ))}
        </>
    )
})