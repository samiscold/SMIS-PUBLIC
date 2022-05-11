import React, { useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {countryStore} = useStore();

  useEffect(() => {
    countryStore.loadCountries();
  }, [countryStore]);

  if (countryStore.loadingInitial) return <LoadingComponent content='Loading app ...' />;

  return (
    <div className="App">
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <CountryDashboard />
      </Container>
    </div>
  );
}

export default observer(App);
