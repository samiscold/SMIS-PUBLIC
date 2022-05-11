import { observer } from "mobx-react-lite";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import CountryForm from "../form/CountryForm";
import CountryList from "./CountryList";

export default observer(function CountryDashboard() {
    const {countryStore} = useStore();
    const { editMode } = countryStore;

    return (
        <Row>
            <Col xs="6">
                <CountryList />
            </Col>
            <Col xs="2">
            </Col>
            <Col xs="4">
                {editMode && <CountryForm />}
            </Col>
        </Row>
    )
})