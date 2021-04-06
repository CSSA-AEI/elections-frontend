import React, { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';
import {
  Snackbar,
  Button,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  CircularProgress,
  withStyles,
  createStyles,
  CssBaseline,
  Avatar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Props } from './Props';
import CandidatesData from '../assets/candidates';
// VoteBallot Interface will be returned upon voting
import VoteBallot from './VoteBallot';

const styles = () =>
  createStyles({
    avatar: {
      backgroundColor: 'inherit',
      color: '#31AFD4',
      margin: 'auto',
    },
    submit: {
      marginBottom: '40px',
    },
  });

const Vote = (props: Props) => {
  const [t] = useTranslation();
  const { classes } = props;

  const [voteTime, setVoteTime] = useState(undefined);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [exec, setExec]: any = useState({
    PRES: '',
    FNCE: '',
    ACDM: '',
    SOCL: '',
    // COMS: '',
    INTR: '',
    EXTR: '',
    PHIL: '',
    EQUT: '',
    EXAF: '',
    INTE: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    exec[e.target.name] = e.target.value;
    setExec({
      ...exec,
    });
  };

  const handleAlertClose = () => {
    setIsError(false);
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSending(true);
    fetch('/proxy/vote', {
      method: 'POST',
      body: JSON.stringify({
        hash: props.hash,
        sha: props.sha,
        poll: exec,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => {
        return data.json();
      })
      .then(res => {
        if (res.status === 200) {
          setVoteTime(res.voteTime);
          setExec(res.ballot);
        } else if (res.status === 201) {
          setVoteTime(res.voteTime);
        } else if (res.status === 401) {
          setIsError(true);
          setErrorMessage(t('general.errors.unauthorized'));
        } else if (res.status === 403) {
          setIsError(true);
          setErrorMessage(t('general.errors.votingEnded'));
        } else if (res.status === 429) {
          setIsError(true);
          setErrorMessage(t('general.errors.tryagain'));
        } else {
          const error = new Error(res.status.toString());
          throw error;
        }
      })
      .then(() => {
        setIsSending(false);
      })
      .catch(err => {
        setIsSending(false);
        setIsError(true);
        console.error(err); // eslint-disable-line no-console
        setErrorMessage(t('general.errors.warning'));
      });
  };

  const disableSubmit =
    !exec.PRES ||
    !exec.FNCE ||
    !exec.ACDM ||
    !exec.SOCL ||
    // !exec.COMS ||
    !exec.INTR ||
    !exec.EXTR ||
    !exec.PHIL ||
    !exec.EQUT ||
    !exec.EXAF ||
    !exec.INTE;

  return (
    <div>
      {voteTime && <VoteBallot voteTime={voteTime} ballot={exec} />}
      {!voteTime && (
        <div className="vote">
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Avatar className={classes.avatar}>
              <HowToVoteOutlinedIcon fontSize="large" />
            </Avatar>
            <FormControl key="fControl" component="fieldset">
              {Object.keys(exec).map((key: string) => (
                <Box key={key} mt={3}>
                  <h3>{t(`positionName.${key}`)}</h3>
                  <RadioGroup aria-label={key} name={key} value={exec[key]} onChange={handleChange}>
                    {CandidatesData[key].map((data: { name: string; val: string }) => (
                      <FormControlLabel key={data.name} value={data.val} control={<Radio />} label={<p>{data.name}</p>} />
                    ))}
                    <FormControlLabel key="abstain" value="abstain" control={<Radio />} label={<p>{t('votePage.abstain')}</p>} />
                  </RadioGroup>
                </Box>
              ))}
            </FormControl>
          </Container>
          <Box mt={4}>
            {!isSending && (
              <Button variant="outlined" className={classes.submit} color="primary" onClick={handleClick} disabled={disableSubmit}>
                {t('votePage.submit')}
              </Button>
            )}
            {isSending && <CircularProgress />}
          </Box>
          <Snackbar open={isError} autoHideDuration={10000} onClose={handleAlertClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity="error">
              {errorMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};
export default withStyles(styles)(Vote);
