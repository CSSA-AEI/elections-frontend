import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Import MUI Components
import { Container, Snackbar, withStyles, createStyles, CssBaseline, Avatar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
// Import Props interface & Candidate Info
import { Props } from './Props';

/**
 * CreateStyles allows us to style MUI components
 * This @var is passed as a paramater in the export of the component
 * @see https://material-ui.com/styles/basics/
 */
const styles = () =>
  createStyles({
    avatar: {
      marginBottom: '20px',
      backgroundColor: 'inherit',
      color: '#31AFD4',
      margin: 'auto',
    },
  });

/**
 * The VoteBallot component displays who the user voted for
 * @requires A valid candidates.ts file
 */
const VoteBallot = (props: Props) => {
  const [t] = useTranslation();
  const { classes } = props;
  const [displaySuccess, setDisplaySuccess] = useState(true); // Alerts the user of a successful vote
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [candidatesData, setCandidatesData]: any = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of page upon render
    fetch('/proxy/vote/candidates')
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) setCandidatesData(res.data);
      });
  }, []);

  /**
   * @function Closes the success alert popup after a period of time
   */
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
            {candidatesData.length !== 0 &&
              Object.keys(candidatesData).map((key: string) => (
                <div key={key}>
                  <b>{t(`positionName.${key}`)}</b>
                  <p>
                    {candidatesData[key].filter((elem: { name: string; val: string }) => elem.val === props.ballot[key])[0]?.name ||
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
