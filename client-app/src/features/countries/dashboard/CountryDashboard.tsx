import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CountryList from "./CountryList";

export default observer(function CountryDashboard() {
    const { countryStore } = useStore();
    const {loadCountries, countryRegistry} = countryStore;

    useEffect(() => {
        if (countryRegistry.size <= 1) loadCountries();
    }, [loadCountries, countryRegistry.size]);

    if (countryStore.loadingInitial) return <LoadingComponent content='Loading app ...' />;

    return (
        <Row>
            <Col xs="6">
                <CountryList />
            </Col>
        </Row>
    )
})