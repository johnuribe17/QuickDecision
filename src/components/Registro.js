import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(10),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  linkHome: {
    textDecoration: "none",
    color: 'inherit'
  }
}));

export default function Registro(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const preloadedValues = {
    userName: "",
    email: "",
    password: ""
  };
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  });

  const handleRegister = async (data) => {
    // e.preventDefault();
    console.log(data);
    axios({
      method: 'POST',
      url: 'http://localhost:8000/users/signup',
      data: data,
    })
      .then(({ data }) => {
        // localStorage.setItem('token', data.token);
        localStorage.setItem("userInfo", JSON.stringify(data));
        props.history.push('/');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography color="primary" className={classes.avatar} component="h1" variant="h3">
          <Link to="/" className={classes.linkHome}>
            QuickDecision
          </Link>
        </Typography>
        <Typography variant="h5">
          {t('Registro.registro')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleRegister)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                id="usuario"
                label={t('Registro.nombre')}
                name="userName"
                inputRef={register({required: true})}
                autoComplete="usuario"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                id="email"
                label={t('Registro.correo')}
                name="email"
                inputRef={register({pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/})}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                name="password"
                inputRef={register({required: true})}
                label={t('Registro.contrasena')}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t('Registro.registrarse')}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography color="primary">
                <Link to="/ingreso" className={classes.linkHome}>
                  {t('Registro.ingresar')}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}