import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registration } from '../../actions/Account/UserActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

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

export default function Reg({ location, history }) {
    const classes = useStyles();

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split("=")[1] : "/"

    const userRegister = useSelector(state => state.Profile["userRegister"])
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };

    const { handleSubmit, control, formState: { errors }, getValues } = useForm({ defaultValues });

    const [data, setData] = useState(null);

    const onSubmit = data => {
        
        dispatch(registration(data))
    };

    return (
        <Container component="main" maxWidth="xs">
            {error && <Message severity="error">{error}</Message>}
            {loading && <Loader />}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{
                                    required: "Обязательное поле",
                                    pattern: {
                                        value: /^[A-Za-z.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>\u0400-\u04FF]*$/i,
                                        message: "Неправильно набрано имя"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Слишком короткое имя"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Слишком длинное имя"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Имя"
                                        variant="filled"
                                        error={errors.firstName ? true : false}
                                        helperText={errors?.firstName && errors.firstName.message}
                                    />

                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{
                                    required: "Обязательное поле",
                                    pattern: {
                                        value: /^[A-Za-z.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>\u0400-\u04FF]*$/i,
                                        message: "Неправильно набрана фамилия"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "Слишком короткая фамилия"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Слишком длинная фамилия"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Фамилия"
                                        variant="filled"
                                        error={errors.lastName ? true : false}
                                        helperText={errors?.lastName && errors.lastName.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Обязательное поле",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                                        message: "Неправильный формат e-mail"
                                    },

                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="e-mail"
                                        variant="filled"
                                        error={errors.email ? true : false}
                                        helperText={errors?.email && errors.email.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Вы длжны указать пароль",
                                    minLength: {
                                        value: 4,
                                        message: "Пароль должен состоять из минимум 4 знаков"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type="password"
                                        label="Пароль"
                                        variant="filled"
                                        error={errors.password ? true : false}
                                        helperText={errors?.password && errors.password.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="passwordConfirm"
                                control={control}
                                rules={{
                                    required: "Укажите пароль второй раз",
                                    validate: value => {
                                        if (value === getValues()["password"]) {
                                            return true;
                                        } else {
                                            return "Пароли не совпадают";
                                        }
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type="password"
                                        label="Подтвердите пароль"
                                        variant="filled"
                                        error={errors.passwordConfirm ? true : false}
                                        helperText={errors?.passwordConfirm && errors.passwordConfirm.message}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>



                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Завершить регистрацию
                  </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={redirect ? `/Login?redirect=${redirect}` : "Login"} color="primary" variant="body2">
                                Уже есть аккаунт? Войдите
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