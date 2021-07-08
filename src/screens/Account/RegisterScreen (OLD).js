import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../actions/Account/UserActions';
import Loader from '../../components/Loader'
import Message from '../../components/Message'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                ACS
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Local JSX Style
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function RegisterScreen({ location, history }) {
    const classes = useStyles();

    /*** Local States ***/
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("")
    const [emailHelper, setEmailHelper] = useState("")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [message, setMessage] = useState("")

    const onChange = event => {
        let valid;

        switch (event.target.id) {
            case "email":
                setEmail(event.target.value)
                // Email Pattern (Regex)
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)

                if (!valid) {
                    setEmailHelper("Invalid email")
                } else {
                    setEmailHelper("")
                }

                break;
            default:
                break;
        }
    }

    /*** Redux States ***/
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split("=")[1] : "/"

    const userRegister = useSelector(state => state.Profile["userRegister"])
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    /** Send POST to Backend **/
    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!")
        } else { dispatch(registration(firstName, lastName, email, password)) }

    }

    return (

        <Container component="main" maxWidth="xs">

            {error && <Message severity="error">{error}</Message>}
            {loading && <Loader />}

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                color="secondary"
                                label="First Name"
                                autoFocus

                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                variant="outlined"
                                color="secondary"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"

                                value={email}
                                error={emailHelper.length !== 0}
                                helperText={emailHelper}

                                variant="outlined"
                                color="secondary"


                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="passwordConfirm"
                                variant="outlined"
                                color="secondary"
                                name="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                autoComplete="current-password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>

                        {message && <Message severity="warning">{message}</Message>}

                    </Grid>
                    <Button
                        fullWidth

                        type="submit"
                        disabled={
                            firstName.length === 0 ||
                            lastName.length === 0 ||
                            email.length === 0 ||
                            password.length === 0 ||
                            confirmPassword.length === 0                            
                         }
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={redirect ? `/Login?redirect=${redirect}` : "Login"} color="primary" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}