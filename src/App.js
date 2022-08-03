// import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { async } from 'q';
import Map from './map';
import Weather from './Weather';


class App extends Component {
  constructor (props) {
    super(props);
      this.state = {
       userInput : '',
        allCity: {},
        map: {},
        display_name: '',
        latitude: '',
        longitude: '',
        errorMessage: '',
        displayError: false,
        weather: []
    }
  }

    getCityName = async (e) => {
      e.preventDefault();
      const cityName = e.target.userCityInput.value
      console.log(cityName)
      let url = ''
      const cityDate = await axios.get('{REACT_APP_CITY_KEY}?key=${process.env.REACT_APP_CITY_KEY}&q=${e.target.userCityInput.value}&format=jso')

      try {
        
        console.log(cityDate.data[0]);
  
        this.setState({
          userInput: e.target.userCityInput.value,
          allCity: cityDate.data[0],
          display_name: cityDate.data[0].display_name,
          latitude: cityDate.data[0].lat,
          longitude: cityDate.data[0].log,
          displayError: false
        });


      } catch (error) {
        console.log(error.response)
        this.setState({
          displayError: true,
          errorMessage: error.response.status + ':' + error.response.data.error,
          display_name: ''
        })

      }
      this.displayWeather(cityDate.data[0].lat, cityDate.data[0].lon, cityName)
    }

    //To conect the server side with the client side && handler the error
    displayWeather = async(lat, log, cityName) => {
      try {
        const weatherData = await axios.get('http://localhost:3001/weather',{params: {lat: lat, log: log, searchQuery: cityName}} );
        this.setState({
          weather: weatherData.data,
          displayError: false
        })

      } catch(error) {
        this.setState({
          display_name: '',
          displayError: true,
          errorMessage: error.response.state + ': ' + error.response.data.error

        })
      }
    }

  render () {
      
    return (
      <div className="App">
        <h1>{process.env.REACT_APP_TITLE} </h1>
        <Form onSubmit= {this.getCityName}>
          <Form.Label htmlFor="text" id='userCityInput'>Enter the city name</Form.Label>
          <Form.Control  type="text" id='userCityInput' />

          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.displayError && 
          <>
            {this.state.errorMessage}
          </>}

        {this.state.display_name && 
          <>
             <p>City Name:{this.state.display_name} </p>
             <p>City latitude: {this.state.latitude}</p>
             <p>City longitude:{this.state.longitude} </p>

             <Map map_src={'https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=10'}
               city={this.state.display_name}
              />
              <Weather weather={this.state.weather} />
          </>
        }



      </div>
  );
  }
}

export default App;




// pk.6c0e33814ac6775aa6dbb82d6d8649c2?key=${}&q=New York&format=jso