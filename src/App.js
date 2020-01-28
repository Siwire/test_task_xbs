import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import { CitiesList } from './CitiesList';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import RefreshIcon from '@material-ui/icons/Refresh';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  textfieldaddcity: {
    width: 200,
    height: 30,
    margin: 20,
  },
  button: {
    width: 200,
    height: 50,
  },
  textFieldOutput: {
    margin: 7,
    width: 510,
    backgroundColor: "#777777",
  },
}));

function App() {
  const [cities, setCities] = useState([]);
  const [tesxtFieldValue, setTextValue] = useState('');
  const url = 'http://localhost:8000/cities';
  

  async function readTextarea() {
    const stringFromTask = document.getElementById('city-id').value;
    function CityMap(string) {
      const adjustedArray = string.replace(/[^a-z0-9,.?!;-]/ig, '').split(';');
      adjustedArray.forEach(element => {
        const cityArray = element.split(',');
        if (cityArray[0]) {
          this[cityArray[0]] = { city: cityArray[0], state: cityArray[1], latitude: cityArray[2], longitude: cityArray[3] }
        }
      });
    }
    const cityMap = new CityMap(stringFromTask);
    let cityArray = [];
    for (let key in cityMap) {
      cityArray.push(cityMap[key]);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(cityArray),
    });
    cityArray = [];
  }
  async function refreshTable() {
    const cities = await fetch(url, {
      method: 'GET',
    });
    const json = await cities.json();
    setCities(json);
  }
  async function responseCities() {
    const citiesResponse = await fetch(url, {
      method: 'GET',
    });
    const cities = await citiesResponse.json();
    return cities;
  }
  async function northCity() {
    const citiesForStates = await responseCities();
    let northest = citiesForStates[0];
    for (let i = 0; i < citiesForStates.length; i++) {
      if (citiesForStates[i].latitude > northest.latitude) {
        northest = citiesForStates[i];
      }
    }
    let northCity = northest.city;
    setTextValue(northCity);
  }
  async function southCity() {
    const citiesForStates = await responseCities();
    let southest = citiesForStates[0];
    for (let i = 0; i < citiesForStates.length; i++) {
      if (citiesForStates[i].latitude < southest.latitude) {
        southest = citiesForStates[i];
      }
    }
    let southCity = southest.city;
    setTextValue(southCity);
  }
  async function eastCity() {
    const citiesForStates = await responseCities();
    let eastest = citiesForStates[0];
    for (let i = 0; i < citiesForStates.length; i++) {
      if (+citiesForStates[i].longitude > +eastest.longitude) {
        eastest =  citiesForStates[i];
      }
    }
    let eastCity = eastest.city;
    setTextValue(eastCity);
  }

  async function westCity() {
    const  citiesForStates = await responseCities();
    let westest = citiesForStates[0];
    for (let i = 0; i < citiesForStates.length; i++) {
      if (+citiesForStates[i].longitude < +westest.longitude) {
        westest = citiesForStates[i];
      }
    }
    let westCity = westest.city
    setTextValue(westCity);
  }
  async function readCoordinates() {
    const  citiesForStates = await responseCities();
    let latitudesCoord = document.getElementById('latitudes-id').value;
    let longitudesCoord = document.getElementById('longitudes-id').value;
    let nearCity = citiesForStates[0];
    let distanceArray = [];
    for (let i = 0; i < citiesForStates.length; i++) {
      let x = Math.abs(citiesForStates[i].latitude) - Math.abs(latitudesCoord);
      let y = Math.abs(citiesForStates[i].longitude) - Math.abs(longitudesCoord);
      let c = Math.sqrt(Math.abs(x) ** 2 + Math.abs(y) ** 2);
      distanceArray.push(c);
    }
    let smalldistance = distanceArray[0];
    for (let i = 0; i < distanceArray.length; i++) {
      if (distanceArray[i] < smalldistance) {
        smalldistance = distanceArray[i];
        nearCity = citiesForStates[i];
      }
    }
    let nearCityText = nearCity.city;
    setTextValue(nearCityText);
  }
  async function statesReturn() {
    const citiesResponse = await responseCities();
    let objectStates = {};
    let statesNamesArray = [];
    for (let item of citiesResponse) {
      objectStates[item.state] = undefined;
    }
    for (let key in objectStates) {
      statesNamesArray.push(key)
    }
    setTextValue(statesNamesArray.join(' '));
    
  }
  async function citiesReturn() {
    let state = document.getElementById('search-state-id').value;
    const citiesResponse = await responseCities(); 
    let citiesByState = citiesResponse.filter(function(city){
      if (city.state==state){
        return true;
      }
      return false;
    })
    let citiesText = [];
    for (let item of citiesByState){
      citiesText.push(item.city);
    }
    citiesText = citiesText.join(', ')
    setTextValue(citiesText)
  }
  const url2 = 'http://localhost:8000/city';
  async function addCity() {
    let cityAdd = document.getElementById('City-id').value;
    let stateAdd = document.getElementById('State-id').value;
    let latitudeAdd = document.getElementById('Latitude-id').value;
    let longitudeAdd = document.getElementById('Longitude-id').value;
    let cityObject = {};
    cityObject.city = cityAdd;
    cityObject.state = stateAdd;
    cityObject.latitude = latitudeAdd;
    cityObject.longitude = longitudeAdd;
    const response = await fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(cityObject),
    });
    cityObject = {};
  }
  async function refreshTable() {
    const cities = await fetch(url, {
      method: 'GET',
    });
    const json = await cities.json();
    setCities(json);
  }
  const classes = useStyles();
  return (
    <Box className="App">
      <Box display="flex" m={1}>
        <Box p={1} flexGrow={2} bgcolor="#555555">
          <Button variant="contained" color="default" name='button_refresh_table' onClick={refreshTable} className={classes.button} startIcon={<RefreshIcon />}>Refresh</Button>
          <CitiesList data={cities}></ CitiesList>
        </Box>
        <Box p={1} flexGrow={1} bgcolor="#555555" >
          <Box display="flex" alignItems="flex-end" >
            <TextField className={classes.textfieldaddcity} label='Input List of Cities' name='City' id='city-id'></TextField>
            <Button variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon />} name='button' onClick={readTextarea} >Send List of Cities</Button>
          </Box>
          <Box display='flex'  >
            <Box display='flex' flexDirection='column'>
              <TextField id='City-id' label='City' className={classes.textfieldaddcity} />
              <TextField id="State-id" label='State' className={classes.textfieldaddcity} />
              <TextField id="Latitude-id" label='Latitude' className={classes.textfieldaddcity} />
              <TextField id="Longitude-id" label='Longitude' className={classes.textfieldaddcity} />
            </Box>
            <Box display='flex' alignItems="flex-end">
              <Fab color="default" aria-label="add"  onClick={addCity}><AddIcon /></Fab>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display='flex' justifyContent='flex-start' m={1} flexGrow={1} bgcolor="#555555"  >
        <TextField name='Output' id='output-id' variant="outlined" className={classes.textFieldOutput} label='Output' value={tesxtFieldValue}></TextField>
      </Box>
      <div style={{ width: '100%' }}>
        <Box p={1} display="flex" m={1} flexGrow={1} bgcolor="#555555" justifyContent='space-between'>
          <Box>
            <ButtonGroup orientation='vertical' variant='contained' className={classes.button} aria-label="contained primary button group" >
              <Button size="large" name='button_northCity' onClick={northCity} >Northest</Button>
              <Button size="large" name='button_southCity' onClick={southCity} >Southest</Button>
              <Button size="large" name='button_eastCity' onClick={eastCity} >Eastest</Button>
              <Button size="large" name='button_westCity' onClick={westCity} >Westest</Button>
            </ButtonGroup>
          </Box>
          <Box display="flex" flexDirection='column'>
            <Box>
              <TextField id='search-state-id'></TextField>
              <Button name='button-search-state' onClick={citiesReturn} startIcon={<SearchIcon />}></Button>
            </Box>
            <Button variant="contained" color="default" name='button-list-state' onClick={statesReturn} className={classes.button} style={{ 'margin-top': 20 }}  >List state</Button>
          </Box>
          <Box display="flex" flexDirection='column' justifyContent='flex-start' >
            <TextField label='latitudes' id='latitudes-id' className={classes.textfieldaddcity}></TextField>
            <TextField label='longitudes' id='longitudes-id' className={classes.textfieldaddcity}></TextField>
            <Button variant="contained" color="default" size="large" name='button_coordinates' onClick={readCoordinates} style={{ margin: 20, height: 55   }} className={classes.button}>send coordinates</Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default App;
