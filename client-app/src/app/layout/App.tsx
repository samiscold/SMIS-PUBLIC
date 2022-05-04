import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import axios from 'axios';
import { Country } from '../models/country';
import { Container } from 'react-bootstrap';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Country[]>('http://localhost:5000/api/countries').then(response => {
      setCountries(response.data);
    });
  }, []);

  function handleSelectCountry(id: string) {
    setSelectedCountry(countries.find(x => x.id === id));
  }

  function handleCancelSelectCountry() {
    setSelectedCountry(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectCountry(id) : handleCancelSelectCountry();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditCountry(country: Country) {
    country.id
     ? setCountries([...countries.filter(x => x.id !== country.id), country])
     : setCountries([...countries, {...country, id: uuid()}]);

     setEditMode(false);
  }

  function handleDeleteCountry(id: string) {
    setCountries([...countries.filter(x => x.id !== id)]);
    setEditMode(false);
  }

  return (
    <div className="App">
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <CountryDashboard countries={countries} 
        selectedCountry={selectedCountry}
        selectCountry={handleSelectCountry}
        cancelSelectCountry={handleCancelSelectCountry}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditCountry}
        deleteCountry={handleDeleteCountry}
        />
      </Container>
    </div>
  );
}

export default App;
