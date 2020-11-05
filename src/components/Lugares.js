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
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(0),
  // minWidth: 120,
  // alignItems: "center"
  // },
  categoryStyle: {
    marginLeft: "20px",
  },
  selCategoryStyle: {
    minWidth: "100%"
  },
  buttonStyle: {
    borderRadius: "20px"
  },
  cardVenue: {
    marginTop: "20px",
    borderRadius: "16px"
  },
  image: {
    maxWidth: "320px",
    maxHeight: "320px"
  },
  cardDescription: {
    flexGrow: 1,
    height: "auto"
  },
  text: {
    maxWidth: "fill-available"
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
  const { register, handleSubmit, control } = useForm({
    defaultValues: preloadedValues
  });
  const [latlong, setLatlong] = useState("");
  // const [venues, setVenues] = useState([]);
  const [venueSelected, setVenueSelected] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getLocation();
    // }, [venueSelected]);
  }, []);

  // useEffect(() => {
  // }, [venueSelected]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
      setLatlong(response.coords.latitude + "," + response.coords.longitude);
    });
  }

  const getVenues = async (data) => {
    // e.preventDefault();
    console.log(data);

    const endPoint1 = "https://api.foursquare.com/v2/venues/explore?";
    const params1 = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      ll: latlong,
      query: data.queryWord,
      limit: data.limit,
      section: data.section,
      radius: parseInt(data.radius) * 1000,
      v: "20201022"
    };
    const res1 = await axios.get(endPoint1 + new URLSearchParams(params1))
    // .then(response => {
    // setVenues(response.data.response.groups[0].items);
    // setVenues(res1.data.response.groups[0].items);
    // console.log(res1);
    // })
    // .catch((err) => console.log(err));
    const random = Math.random();
    const index = Math.floor(res1.data.response.groups[0].items.length * random);
    console.log(random);
    console.log(index);
    const venueId = res1.data.response.groups[0].items[index].venue.id;
    console.log(venueId);

    const endPoint2 = `https://api.foursquare.com/v2/venues/${venueId}?`;
    const params2 = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      v: "20201022"
    };
    const res2 = await axios.get(endPoint2 + new URLSearchParams(params2))
    //   // .then(response => {
    setVenueSelected(res2.data.response.venue);
    console.log(res2.data.response.venue);
  }

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
              {t('Lugares.selecciona')}
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
                    <Typography variant="body1" color="textSecondary">{t('Lugares.categoria')}</Typography>
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
                          <MenuItem key="vacio" value="">{t('Lugares.sinCategoria')}</MenuItem>
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
                  placeholder={t('Lugares.keyword')}
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
                  <Typography variant="body1" color="textSecondary">{t('Lugares.radio')}</Typography>
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
              <Typography variant="body1" color="textSecondary">
                {t('Lugares.escoger')}
              </Typography>
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
              <Typography color="textSecondary" variant="body1">
                {t('Lugares.resultados')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.buttonStyle}
            >
              {t('Lugares.buscar')}
            </Button>
          </Grid>
        </Grid>
      </form>

      { venueSelected.name &&
        <Card className={classes.cardVenue}>
          <Grid container >
            {venueSelected.bestPhoto &&
              <Grid item xs={12} md={6} className={classes.image}>
                <CardMedia
                  component="img"
                  className={classes.image}
                  // alt="Contemplative Reptile"
                  // height="140"
                  image={`${venueSelected.bestPhoto.prefix}original${venueSelected.bestPhoto.suffix}`}
                // title="Contemplative Reptile"
                />
              </Grid>
            }
            {/* <Grid item xs={12} md={6} className={classes.cardDescription}> */}
            <Grid item className={classes.cardDescription}>
              <CardContent className={classes.cardDescription}>
                <Grid container direction="column" justify="space-between">
                  <Grid item>
                    <Typography color="primary" className={classes.text} gutterBottom variant="h5" align="center">
                      {venueSelected.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" variant="body2" color="textSecondary">
                      {venueSelected.categories[0].name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" variant="body2" color="textSecondary">
                      {venueSelected.location.city}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" className={classes.text} variant="body2" color="textSecondary">
                      {venueSelected.location.address}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" variant="body2" color="textSecondary">
                      {venueSelected.rating}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center">
                      <Link href={venueSelected.canonicalUrl} color="inherit" target="_blank" rel="noopener noreferrer">
                        {t('Lugares.visitar')}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      }

      {/* <ul>
        {venues.map(venue => {
          return (
            <li key={venue.venue.name}>{venue.venue.name} Location: {venue.venue.location.address}</li>
          )
        })}
      </ul> */}
    </div>
  );
}

export default Lugares;
