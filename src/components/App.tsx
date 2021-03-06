import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Allows for website bilingualism

// Import React Components
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import Login from './Login';
import Candidates from './Candidates';

/**
 * The Main React Component of the elections platform
 * @returns The render of what the React DOM should look like
 */
const App = () => {
  const [t] = useTranslation();

  // Set website title on startup
  useEffect(() => {
    document.title = t('general.title');
  }, [t]);

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/vote/:sha" component={Login} />
        <Route exact path={['/candidates', '/candidates/:sha']} component={Candidates} />
        <Route render={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </div>
  );
};

export default App;
