import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

export default function ErrorFound() {
  const [t] = useTranslation(); // For i18n translation

  return (
    <div style={{ padding: 20, margin: '20px auto', maxWidth: '500px' }}>
      <h1>{t('errorPage.subtitle')}</h1>
      <p>{t('errorPage.description')}</p>
      <br />
      <Button variant="outlined" fullWidth color="primary" type="submit" onClick={() => window.location.replace('/')}>
        {t('errorPage.return')}
      </Button>
    </div>
  );
}
