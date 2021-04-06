import React from 'react';
import { useTranslation } from 'react-i18next';

import WhereToVoteOutlinedIcon from '@material-ui/icons/WhereToVoteOutlined';
import { Container, CssBaseline, Box, withStyles, Avatar, createStyles } from '@material-ui/core';
import { default as MUILink } from '@material-ui/core/Link';

import { Props } from './Props';

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

const LandingPage = (props: Props) => {
  const [t] = useTranslation();
  const { classes } = props;

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <WhereToVoteOutlinedIcon fontSize="large" />
      </Avatar>
      <Box mt={4}>
        <h2>{t('landingPage.voteEnd')}</h2>
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
