import React from 'react';
import { useTranslation } from 'react-i18next';
// Material-UI Components
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';
import { Container, withStyles, createStyles, Box, CssBaseline, Avatar } from '@material-ui/core';
import { default as MUILink } from '@material-ui/core/Link';
// Props interface & Candidate info
import { Props } from './Props';
import CandidatesData from '../assets/candidates';

const styles = () =>
  createStyles({
    avatar: {
      backgroundColor: 'inherit',
      color: '#31AFD4',
      margin: 'auto',
    },
    image: {
      height: '20%',
      width: '20%',
      borderRadius: '50%',
    },
  });

const Candidates = (props: Props) => {
  const [t] = useTranslation();
  const { classes } = props;

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <EmojiPeopleOutlinedIcon fontSize="large" />
      </Avatar>
      <h3>{t('candidatesPage.subtitle')}</h3>
      <Box>
        <p>
          {t('general.contact')}
          <MUILink color="inherit" href="mailto:it@cssa-aei.ca">
            {'it@cssa-aei.ca'}
          </MUILink>
        </p>
      </Box>
      <div className="candidates">
        {Object.keys(CandidatesData).map((key: string) => (
          <div id={key} key={key}>
            <Box mt={3}>
              <h2>{t(`positionName.${key}`)}</h2>
              {CandidatesData[key].map((data: { name: string; val: string }) => (
                <Box key={data.val} mt={2}>
                  <h5>{data.name}</h5>
                  <Box mt={1}>
                    <img alt={data.name} key={data.name} className={classes.image} src={`/candidates/${data.val}.jpg`} />
                  </Box>
                  <Box mt={1}>
                    <p>{t(`candidatesPage.${data.val}`)}</p>
                  </Box>
                </Box>
              ))}
            </Box>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default withStyles(styles)(Candidates);
