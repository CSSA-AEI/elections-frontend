import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NavBar from './NavBar';
import LandingPage from './LandingPage';
import Login from './Login';
import Candidates from './Candidates';

const App = () => {
  const [t] = useTranslation();

  // Set title on startup
  useEffect(() => {
    document.title = t('general.title');
  }, [t]);

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/vote/:sha" component={Login} />
        <Route exact path={['/candidates', '/candidates/:id']} component={Candidates} />
        <Route render={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </div>
  );
};

export default App;
