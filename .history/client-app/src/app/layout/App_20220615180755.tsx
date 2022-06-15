import React from 'react';
import './App.css';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import CountryForm from '../../features/countries/form/CountryForm';
import DepartmentForm from '../../features/departments/form/DepartmentForm';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/countries' component={CountryDashboard} />
              <Route key={location.key} path={['/createCountry', '/manage/:id']} component={CountryForm} />
              <Route exact path='/departments' component={DepartmentDashboard} />
              <Route key={location.pathname} path={['/createDepartment', '/manages/:id']} component={DepartmentForm} />
            </Container>
          </>
        )}
      />
    </div>
  );
}

export default observer(App);
