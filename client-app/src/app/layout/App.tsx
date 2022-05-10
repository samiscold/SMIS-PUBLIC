import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import { Country } from '../models/country';
import { Container } from 'react-bootstrap';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Countries.list().then(response => {
      setCountries(response);
      setLoading(false);
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
    setSubmitting(true);
    if (country.id) {
      agent.Countries.update(country).then(() => {
        setCountries([...countries.filter(x => x.id !== country.id), country]);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      country.id = uuid();
      agent.Countries.create(country).then(() => {
        setCountries([...countries, country]);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteCountry(id: string) {
    setSubmitting(true);
    agent.Countries.delete(id).then(() => {
      setCountries([...countries.filter(x => x.id !== id)]);
      setEditMode(false);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app ...' />;

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
        submitting={submitting}
        />
      </Container>
    </div>
  );
}

export default App;
