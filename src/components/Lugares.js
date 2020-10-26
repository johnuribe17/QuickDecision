import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import PlaceIcon from '@material-ui/icons/Place';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(0),
    // minWidth: 120,
    // alignItems: "center"
  // },
    categoryStyle: {
      marginLeft: "10px",
    },
    selCategoryStyle: {
      minWidth: "100%"
    }
}));

const sections = [
  { spanish: "Comida", ingles: "Food", id: "food" },
  { spanish: "Bebida", ingles: "Drinks", id: "drinks" },
  { spanish: "Café", ingles: "Coffee", id: "coffee" },
  { spanish: "Tiendas", ingles: "Shops", id: "shops" },
  { spanish: "Arte", ingles: "Arts", id: "arts" },
  { spanish: "Aire Libre", ingles: "Outdoors", id: "outdoors" },
  { spanish: "Turismo", ingles: "Sights", id: "sights" },
  { spanish: "Tendencias", ingles: "Trending", id: "trending" }
];

function Lugares() {
  const classes = useStyles();
  const preloadedValues = {
    limit: "20",
    radius: "10",
    section: ""
  };
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: preloadedValues
  });
  const [latlong, setLatlong] = useState("");
  const [venues, setVenues] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
      setLatlong(response.coords.latitude + "," + response.coords.longitude);
    });
  }

  const getVenues = (data) => {
    // e.preventDefault();
    console.log(data);

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      ll: latlong,
      query: data.queryWord,
      limit: data.limit,
      section: data.section,
      radius: parseInt(data.radius) * 1000,
      v: "20201022"
    };
    axios.get(endPoint + new URLSearchParams(params))
      .then(response => {
        setVenues(response.data.response.groups[0].items);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  // const changeHandler = (event) => {
  //   setSearchInput(event.target.value);
  // }

  // const onSubmit = (data) => {
  //   console.log(data);
  // setSearchInput(data.queryWord);
  // };

  return (
    <div>
      {/* <form onSubmit={getVenues}>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="search venue"
          name="searchInput"
          id="searchInput"
        />
        <button type="submit" >Search</button>
      </form> */}

      <form onSubmit={handleSubmit(getVenues)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h6">
              {t('Lugares.title2')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              Selecciona una categoría o palabra clave para obtener de forma aleatoria tu recomendación
          </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="space-evenly"
            spacing={2}
          >
            <Grid item xs={12} md={4} container alignItems="center">
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Box >
                    <Typography variant="body1" color="textSecondary">Categoría</Typography>
                  </Box>
                  <Box flexGrow={1} className={classes.categoryStyle} >
                    <Controller
                      as={
                          <Select 
                          className={classes.selCategoryStyle}
                          // autoWidth
                          // label="categoría"
                          // labelId="demo-simple-select-label"
                          // id="demo-simple-select"
                          // value={}
                          // onChange={handleChange}
                          >
                            {i18n.language === "es" ?
                            sections.map((sect) => (
                              <MenuItem key={sect.id} value={sect.ingles}>
                                {sect.spanish}
                              </MenuItem>
                            )) :
                            sections.map((sect) => (
                              <MenuItem key={sect.id} value={sect.ingles}>
                                {sect.ingles}
                              </MenuItem>
                            ))}
                          </Select>
                      }
                      name="section"
                      control={control}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="flex-end">
                <TextField
                  placeholder="Palabra clave"
                  fullWidth
                  name="queryWord"
                  inputRef={register}
                  margin="dense"
                ></TextField>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            // container
            // spacing={2}
            // alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <Box>
                  <Typography variant="body1" color="textSecondary">Radio en km</Typography>
                </Box>
                <Box m={1}>
                  <Controller
                    as={
                      <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        // value={20}
                        // onChange={handleChange}
                        disableUnderline
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select>
                    }
                    name="radius"
                    control={control}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="body1" color="textSecondary">Escoger entre los primeros</Typography>
            </Grid>
            <Grid item>
              <Controller
                as={
                  <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    // value={20}
                    // onChange={handleChange}
                    disableUnderline
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                }
                name="limit"
                control={control}
              />
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">resultados</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
            >
              Buscar
          </Button>
          </Grid>
        </Grid>
      </form>

      <ul>
        {venues.map(venue => {
          return (
            <li key={venue.venue.name}>{venue.venue.name} Location: {venue.venue.location.address}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default Lugares;
