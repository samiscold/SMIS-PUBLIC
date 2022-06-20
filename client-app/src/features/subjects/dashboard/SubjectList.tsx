import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import SubjectListItem from "./SubjectListItem";

export default observer(function SubjectList() {
    const { subjectStore } = useStore();
    const { groupedSubjects } = subjectStore;

    return (
        <>
            {groupedSubjects.map(([group, subjects]) => (
                <Fragment key={group}>
                    <h5 className="text-primary text-start ps-3">
                        {group}
                    </h5>
                    <ListGroup className="pb-4">
                        {subjects.map(subject => (
                            <SubjectListItem key={subject.id} subject={subject} />
                        ))}
                    </ListGroup>
                </Fragment>
            ))}
        </>
    )
}) 