import { Col, Row } from "react-bootstrap";
import { Country } from "../../../app/models/country"
import CountryForm from "../form/CountryForm";
import CountryList from "./CountryList";

interface Props {
    countries: Country[];
    selectedCountry: Country | undefined;
    selectCountry: (id: string) => void;
    cancelSelectCountry: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (country: Country) => void;
    deleteCountry: (id: string) => void;
    submitting: boolean;
}

export default function CountryDashboard({ countries, selectedCountry, selectCountry, editMode, openForm, closeForm, createOrEdit, deleteCountry, submitting }: Props) {
    return (
        <Row>
            <Col xs="6">
                <CountryList countries={countries} selectCountry={selectCountry} openForm={openForm} deleteCountry={deleteCountry} submitting={submitting} />
            </Col>
            <Col xs="2">
            </Col>
            <Col xs="4">
                {editMode && <CountryForm closeForm={closeForm} country={selectedCountry} createOrEdit={createOrEdit} submitting={submitting} />}
            </Col>
        </Row>
    )
}