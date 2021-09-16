import React, { SyntheticEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Import Material-UI Components
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
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';
// Import Props interface
import { Props } from './Props';
// Import VoteBallot component to redirect to as soon as the user votes
import VoteBallot from './VoteBallot';

/**
 * CreateStyles allows us to style MUI components
 * The @var styles passed as a paramater in the export of the component
 * @see https://material-ui.com/styles/basics/
 */
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

/**
 * The Vote component holds the Ballot form that the user fills out
 * @requires candidatesData from backend
 */
const Vote = (props: Props) => {
  const [t] = useTranslation();
  const { classes } = props;

  const [voteTime, setVoteTime] = useState(undefined); // The time of the user's ballot submission
  const [isSending, setIsSending] = useState(false); // Set to true when the user submits
  const [isError, setIsError] = useState(false); // Set to true if an error has occured
  const [errorMessage, setErrorMessage] = useState(''); // A message displayed to the user upon error

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [candidatesData, setCandidatesData]: any = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [exec, setExec]: any = useState({
    // Tracks the user's current ballot status
    PRES: '',
    FNCE: '',
    ACDM: '',
    SOCL: '',
    COMS: '',
    INTR: '',
    EXTR: '',
    PHIL: '',
    EQUT: '',
    EXAF: '',
    INTE: '',
  });

  useEffect(() => {
    fetch('/proxy/vote/candidates')
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) setCandidatesData(res.data);
      });
  }, []);

  /**
   * @function handleChange() Updates the status of the user's ballot whenever a RadioButton is selected
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    exec[e.target.name] = e.target.value;
    setExec({
      ...exec,
    });
  };

  /**
   * @function handleAlertClose() Closes the Error popup after a period of time
   */
  const handleAlertClose = () => {
    setIsError(false);
  };

  /**
   * @function handleClick() Manages the Submission proccess of a ballot
   * Makes a POST to /proxy/vote with the user's ballot, client hash, and sha values
   * If 200, set the user's vote time and redirect to VoteBallot component
   * If 201, simply redirect to VoteBallot component, as user has already voted
   * If 401, display that user is unauthorized
   * If 403, display that the voting period has ended
   * If 429, request user to try again at a later time
   */
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSending(true);
    fetch('/proxy/vote/submit', {
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
      .then(data => data.json())
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

  /**
   * @var disableSubmit Unlocks the submit button when the user has filled out their ballot
   */
  const disableSubmit =
    !exec.PRES ||
    !exec.FNCE ||
    !exec.ACDM ||
    !exec.SOCL ||
    !exec.COMS ||
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
            {Object.keys(candidatesData).length === 0 && <CircularProgress />}
            {Object.keys(candidatesData).length !== 0 && (
              <FormControl key="fControl" component="fieldset">
                {Object.keys(exec).map((key: string) => (
                  <Box key={key} mt={3}>
                    <h3>{t(`positionName.${key}`)}</h3>
                    <RadioGroup aria-label={key} name={key} value={exec[key]} onChange={handleChange}>
                      {candidatesData[key].map((data: { name: string; val: string }) => (
                        <FormControlLabel key={data.name} value={data.val} control={<Radio />} label={<p>{data.name}</p>} />
                      ))}
                      <FormControlLabel key="abstain" value="abstain" control={<Radio />} label={<p>{t('votePage.abstain')}</p>} />
                    </RadioGroup>
                  </Box>
                ))}
              </FormControl>
            )}
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
