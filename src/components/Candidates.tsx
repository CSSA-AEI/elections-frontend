import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import Material-UI Components
import { Container, withStyles, createStyles, Box, CssBaseline, Avatar, CircularProgress } from '@material-ui/core';
import { default as MUILink } from '@material-ui/core/Link';
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';
// Import Props interface & Candidate info
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
      height: '20%',
      width: '20%',
      borderRadius: '50%',
    },
  });

/**
 * The candidates page stores contact info, the candidate names, and their platforms
 * @requires candidatesData from backend
 * @requires images from elections-frontend/public/candidates
 */
const Candidates = (props: Props) => {
  const { classes } = props;
  const [t] = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [candidatesData, setCandidatesData]: any = useState([]);

  useEffect(() => {
    fetch('/proxy/vote/candidates')
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) setCandidatesData(res.data);
      });
  }, []);

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
      {Object.keys(candidatesData).length === 0 && <CircularProgress />}
      {Object.keys(candidatesData).length !== 0 && (
        <div className="candidates">
          {Object.keys(candidatesData).map((key: string) => (
            <div id={key} key={key}>
              {candidatesData[key].length > 0 && (
                <Box mt={3}>
                  <h2>{t(`positionName.${key}`)}</h2>
                  {candidatesData[key].map((data: { name: string; val: string }) => (
                    <Box key={data.val} mt={2}>
                      <h5>{data.name}</h5>
                      <Box mt={1}>
                        {/** @requires images to be in JPG format */}
                        <img alt={data.name} key={data.name} className={classes.image} src={`/candidates/${data.val}.jpg`} />

                        {/** @note Enable only if running Demo service */}
                        {/* <img alt={data.name} key={data.name} className={classes.image} src={`/candidates/demo/${data.val}.jpg`} /> */}
                      </Box>
                      <Box mt={1}>
                        <p>{t(`candidatesPage.${data.val}`) != `candidatesPage.${data.val}` ? t(`candidatesPage.${data.val}`) : ""}</p>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
export default withStyles(styles)(Candidates);
