import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import MUI Components
import WhereToVoteOutlinedIcon from '@material-ui/icons/WhereToVoteOutlined';
import { Container, CssBaseline, Box, withStyles, Avatar, createStyles } from '@material-ui/core';
import { default as MUILink } from '@material-ui/core/Link';
// Import Props interface to define what this component can receive as props
import { Props } from './Props';

/**
 * CreateStyles allows us to style MUI components
 * The @var styles is passed as a paramater in the export of the component
 * @see https://material-ui.com/styles/basics/
 */
const styles = () =>
  createStyles({
    avatar: {
      backgroundColor: 'inherit',
      color: '#31AFD4',
      margin: 'auto',
    },
    image: {
      height: '100%',
      width: '100%',
    },
  });

/**
 * The LandingPage holds basic voting instructions, and the current election status (i.e not open, open, ended)
 */
const LandingPage = (props: Props) => {
  const [t] = useTranslation();
  const { classes } = props;
  const [votingStatus, setVotingStatus] = useState('');
  const [startDateString, setStartDateString] = useState('');
  const [endDateString, setEndDateString] = useState('');

  useEffect(() => {
    fetch('/proxy/vote/status')
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) {
          setVotingStatus(res.votingStatus);
          setStartDateString(res.startDateString);
          setEndDateString(res.endDateString);
        }
      });
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <WhereToVoteOutlinedIcon fontSize="large" />
      </Avatar>
      <Box mt={4}>
        {/** @see (en||fr).json for different election status messages (voteStart, voteOpen, voteEnd) */}
        {votingStatus !== '' && (
          <span>
            <h2>{t(`landingPage.${votingStatus}`)}</h2>
            <h4>{startDateString + ' - ' + endDateString}</h4>
          </span>
        )}
      </Box>
      <Box mt={4}>
        <p>
          <b>{t('landingPage.instructionsP1')}</b>
        </p>
      </Box>
      <Box mt={4}>
        <p>{t('landingPage.instructionsP2')}</p>
      </Box>
      <Box mt={4}>
        <p>
          {t('general.contact')}
          <MUILink color="inherit" href="mailto:it@cssa-aei.ca">
            {'it@cssa-aei.ca'}
          </MUILink>
        </p>
      </Box>
      <Box mt={4}>
        <p>
          <MUILink color="inherit" href="https://www.cssa-aei.ca/">
            CSSA-AÉI
          </MUILink>
          {' © ' + new Date().getFullYear()}
        </p>
      </Box>
    </Container>
  );
};
export default withStyles(styles)(LandingPage);
