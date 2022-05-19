import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import CountryListItem from "./CountryListItem";

export default observer(function CountryList() {
    const { countryStore } = useStore();
    const { groupedCountries } = countryStore;

    return (
        <>
            {groupedCountries.map(([group, countries]) => (
                <Fragment key={group}>
                    <h5 className="text-primary text-start ps-3">
                        {group}
                    </h5>
                    <ListGroup className="pb-4">
                        {countries.map(country => (
                            <CountryListItem key={country.id} country={country} />
                        ))}
                    </ListGroup>
                </Fragment>
            ))}
        </>
    )
})