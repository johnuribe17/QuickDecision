import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
    minWidth: 340,
    // marginTop: "20px"
  },
  containerStyle: {
    maxWidth: "100vw"
  }
});

function Aleatorio(props) {
  const { t, i18n } = useTranslation();
  const [seleccionado, setSeleccionado] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  const preloadedValues = {
    limit: []
  };
  const { register, handleSubmit, reset } = useForm({
    defaultValues: preloadedValues
  });

  const handleAddOption = (data, e) => {
    setRows(rows.concat(data.option));
    e.target.reset();
  };
  const handleSelect = () => {
    const random = Math.random();
    const index = Math.floor(rows.length * random);
    setOptionSelected(rows[index]);
    setSeleccionado(true);
  };

  const handleReset = () => {
    setRows([]);
    setOptionSelected("");
    setSeleccionado(false);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        className={classes.containerStyle}
      >

        {!seleccionado && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">
                {t('Aleatorio.title2')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                {t('Aleatorio.ingresa')}
              </Typography>
            </Grid>
            <Grid item xs={12} container justify="center" alignItems="center">
              <form
                onSubmit={handleSubmit(handleAddOption)}
              >
                <Grid
                  item xs={12}
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <TextField
                      size="small"
                      placeholder={t('Aleatorio.nueva')}
                      // fullWidth
                      name="option"
                      // inputRef={register}
                      // margin="dense"
                      variant="outlined"
                      inputRef={register({ required: true })}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6} container justify="center" alignItems="center">
                    <Button color="primary" type="submit">
                      {t('Aleatorio.agregar')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row}>
                        <TableCell align="center">{row}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </Grid>

            {rows.length > 1 && (
              <Grid item>
                <Button variant="outlined" color="primary" onClick={handleSelect}>
                  {t('Aleatorio.seleccionar')}
                </Button>
              </Grid>
            )}
          </>)}

        {seleccionado && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">
                {t('Aleatorio.felicitaciones')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                {t('Aleatorio.opcion')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                {optionSelected}
              </Typography>
            </Grid>
            <Button variant="outlined" color="primary" onClick={handleReset}>
              {t('Aleatorio.reiniciar')}
            </Button>
          </>
        )}
      </Grid>
    </>
  )
}

export default Aleatorio;