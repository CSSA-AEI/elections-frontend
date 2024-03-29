import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A fallback component page in case an uncaught error has been found
 * @returns A small page to share some error & contact info with the user
 */
export default function ErrorFound() {
  const [t] = useTranslation();

  return (
    <div style={{ padding: 20, margin: '20px auto', maxWidth: '500px' }}>
      <h1>{t('errorPage.subtitle')}</h1>
      <p>{t('errorPage.description')}</p>
    </div>
  );
}
