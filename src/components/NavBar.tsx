import React from 'react';
import { Link } from 'react-router-dom';
// Import Material-UI Components
import LanguageIcon from '@material-ui/icons/Language';
import { CssBaseline, Container, Button, Link as MUILink } from '@material-ui/core';
// Import useTranslation hook to allow for bilingualism
import { useTranslation } from 'react-i18next';

/**
 * The Navigation Bar of the website holds the Logo, Title, and Vote / Candidate Buttons
 */
const NavBar = () => {
  const [t, i18n] = useTranslation();
  const lang = i18n.language; // Fetch the current language being used ('en'/'fr')

  // Fetch the user's unique voting sha256 value (part of their unique voting link)
  const path = window.location.pathname.split('/');
  const sha = path.length === 3 && (path[1] === 'vote' || path[1] === 'candidates') && path[2].length === 64 ? path[2] : undefined;

  return (
    <Container component="nav" maxWidth="md" className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
      <CssBaseline />
      <div style={{ width: 'auto', display: 'inline-block' }}>
        <MUILink
          to={window.location}
          style={{ position: 'fixed', right: 15, top: 5, color: 'rgba(0, 0, 0, 0.87)', fontSize: '18px' }}
          className={'text-capitalize font-weight-normal nav-item nav-link active'}
          component={Link}
          onClick={() => i18n.changeLanguage(lang === 'en' ? 'fr' : 'en')}
        >
          <LanguageIcon style={{ fontSize: 11 }} /> {lang === 'en' ? 'en' : 'fr'}
        </MUILink>
      </div>
      <Container component="div" maxWidth="sm">
        <div style={{ width: 'auto', display: 'inline-block' }}>
          <a href="/">
            <img alt="Elections Logo" src={'/logo.png'} className="nav--image" />
          </a>
        </div>
        <div style={{ width: 'auto', display: 'inline-block' }}>
          <h1 className="nav--title">{t('general.title')}</h1>
        </div>
        <Container component="div" maxWidth="md" className="navbar-nav--items">
          <Button size="large" to={sha ? '/vote/' + sha : '/'} component={Link}>
            {t('general.voteButton')}
          </Button>
          <Button size="large" to={sha ? '/candidates/' + sha : '/candidates'} component={Link}>
            {t('general.candidatesButton')}
          </Button>
        </Container>
      </Container>
    </Container>
  );
};
export default NavBar;
