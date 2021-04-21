import React, { SyntheticEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import bcrypt from 'bcryptjs'; // Bcrypt is used for client-side hashing
// Import MUI Components
import {
  Avatar,
  Button,
  Snackbar,
  CssBaseline,
  TextField,
  Container,
  Theme,
  withStyles,
  LinearProgress,
  createStyles,
} from '@material-ui/core';
import { default as MUILink } from '@material-ui/core/Link';
import MuiAlert from '@material-ui/lab/Alert';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
// Import Props interface
import { Props } from './Props';

// Import Vote component to redirect all new voters
import Vote from './Vote';
// Import VoteBallot component to redirect all users who have already voted
import VoteBallot from './VoteBallot';

/**
 * CreateStyles allows us to style MUI components
 * This @var is passed as a paramater in the export of the component
 * @see https://material-ui.com/styles/basics/
 */
const styles = (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      backgroundColor: 'inherit',
      color: '#31AFD4',
      margin: 'auto',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

const Login = (props: Props) => {
  const [t] = useTranslation(); // For i18n translation
  const { classes } = props; // For withStyles styling of Material-UI
  const sha = props.match.params.sha; // The unique voting sha256 in hex format

  const [id, setID] = useState(''); // The student ID input
  const [hash, setHash] = useState(''); // The hash of the student ID
  const [salt, setSalt] = useState(''); // The salt associated to the hash
  const [ballot, setBallot] = useState(''); // The user's voting ballot if they have already voted
  const [voteTime, setVoteTime] = useState(''); // The time of the user's ballot submission if they have already voted
  const [errorMessage, setErrorMessage] = useState('');

  const [isHashing, setIsHashing] = useState(false); // Set to true before the bcrypt slow-hash begins
  const [isSending, setIsSending] = useState(false); // Set to true when we send the request via proxy
  const [isError, setIsError] = useState(false);
  const [displayVote, setDisplayVote] = useState(false); // Display the vote interface for new users
  const [displayBallot, setDisplayBallot] = useState(false); // Display the ballot interface for existing users

  /* 
      Check if the sha is valid

      If yes, return the corresponding salt. 
      If no, redirect to landing page. 
  */
  useEffect(() => {
    if (!sha || sha.length !== 64) {
      props.history.push('/');
    } else {
      fetch('/proxy/salt', {
        method: 'POST',
        cache: 'force-cache',
        body: JSON.stringify({ sha }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(data => {
          return data.json();
        })
        .then(res => {
          if (res.status === 200) setSalt(res.message);
          else if (res.status === 418) props.history.push('/');
          else throw new Error(res.status);
        })
        .catch(err => {
          console.error(err); // eslint-disable-line no-console
          alert(t('general.errors.tryagain'));
          props.history.push('/');
        });
    }
  }, []);

  // Keep track of user input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };

  // Close error bar upon invalid login
  const handleAlertClose = () => {
    setIsError(false);
  };

  /*
    Hashes the provided input using the salt.
    Sends a proxy request to /login with the hash attempt.
    If 200, render page according to user's vote history (new/old).
    If 401, hash is incorrect.
    If 403, voting period has ended. 
    If 429, too many requests. 
  */
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsHashing(true);

    bcrypt.hash(id, salt, function (err, hash) {
      setIsSending(true);
      fetch(`/proxy/login`, {
        method: 'POST',
        body: JSON.stringify({ hash, sha }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(data => {
          return data.json();
        })
        .then(res => {
          if (res.status === 200) {
            setHash(hash);
            if (!res.hasVoted) {
              setDisplayVote(true);
            } else {
              setVoteTime(res.voteTime);
              setBallot(res.ballot);
              setDisplayBallot(true);
            }
          } else if (res.status === 401) {
            setIsError(true);
            setErrorMessage(t('general.errors.unauthorized'));
          } else if (res.status === 403) {
            setIsError(true);
            setErrorMessage(t(`general.errors.${res.message}`));
          } else if (res.status === 429) {
            setIsError(true);
            setErrorMessage(t('general.errors.tryagain'));
          } else {
            const error = new Error(res.status.toString());
            throw error;
          }
        })
        .then(() => {
          setIsHashing(false);
          setIsSending(false);
        })
        .catch(err => {
          console.error(err); // eslint-disable-line no-console
          setIsHashing(false);
          setIsSending(false);
          setIsError(true);
          setErrorMessage(t('general.errors.warning'));
        });
    });
  };

  return (
    <div>
      {displayVote && <Vote {...props} hash={hash} sha={sha} />}

      {displayBallot && <VoteBallot {...props} voteTime={voteTime} ballot={ballot} />}

      {!displayVote && !displayBallot && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <VpnKeyOutlinedIcon fontSize="large" />
            </Avatar>
            <form className={classes.form} onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="studentID"
                label={t('loginPage.studentID')}
                name="id"
                value={id}
                onChange={handleInputChange}
              />
              <Button
                variant="outlined"
                fullWidth
                color="primary"
                type="submit"
                className={classes.submit}
                disabled={id === '' || isHashing}
              >
                {t('loginPage.signIn')}
              </Button>
              {isSending && <LinearProgress></LinearProgress>}
            </form>
          </div>
          <div className={classes.paper}>
            <p>
              <MUILink color="inherit" href="https://www.cssa-aei.ca/">
                CSSA-AÉI
              </MUILink>
              {' © ' + new Date().getFullYear()}
            </p>
          </div>
          <Snackbar open={isError} autoHideDuration={10000} onClose={handleAlertClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity="error">
              {errorMessage}
            </MuiAlert>
          </Snackbar>
        </Container>
      )}
    </div>
  );
};

export default withStyles(styles)(Login);
