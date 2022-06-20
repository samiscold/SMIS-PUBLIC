import React from 'react';
import './App.css';
import NavBar from './NavBar';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import CountryForm from '../../features/countries/form/CountryForm';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import DepartmentForm from '../../features/departments/form/DepartmentForm';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import SubjectForm from '../../features/subjects/form/SubjectForm';
import SubjectDashboard from '../../features/subjects/dashboard/SubjectDashboard';


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
              <Route exact path='/subjects' component={SubjectDashboard} />
              <Route key={location.key + '-subject'} path={['/createSubject', '/manage-subject/:id']} component={SubjectForm} />
            </Container>
          </>
        )}
      />
    </div>
  );
}

export default observer(App);
