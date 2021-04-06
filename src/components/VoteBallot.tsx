import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import { Container, Snackbar, withStyles, createStyles, CssBaseline, Avatar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Props } from './Props';

import CandidatesData from '../assets/candidates';

const styles = () =>
  createStyles({
    avatar: {
      marginBottom: '20px',
      backgroundColor: 'inherit',
      color: '#31AFD4',
      margin: 'auto',
    },
  });

const VoteBallot = (props: Props) => {
  const [t] = useTranslation();
  const { classes } = props;
  const [displaySuccess, setDisplaySuccess] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAlertClose = () => {
    setDisplaySuccess(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <BallotOutlinedIcon fontSize="large" />
      </Avatar>
      <div id="votesuccess">
        <div className="votesuccess">
          <div className="thankyou">
            <h3>
              {t('votesuccessPage.voteDate')} {props.voteTime}
            </h3>
            {Object.keys(CandidatesData).map((key: string) => (
              <div key={key}>
                <b>{t(`positionName.${key}`)}</b>
                <p>
                  {CandidatesData[key].filter((elem: { name: string; val: string }) => elem.val === props.ballot[key])[0]?.name ||
                    t('votePage.abstain')}
                </p>
              </div>
            ))}
            <h3>{t('votesuccessPage.thankYou')}</h3>
          </div>
        </div>
      </div>
      <Snackbar open={displaySuccess} autoHideDuration={5000} onClose={handleAlertClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose}></MuiAlert>
      </Snackbar>
    </Container>
  );
};
export default withStyles(styles)(VoteBallot);
