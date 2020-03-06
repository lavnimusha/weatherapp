import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import './App.css';
import Ui from './components/ui';

import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '',
      display: false,
      temperature: '' ,
      description:'',
      iconId:'',
      city:'',
      country:''
    };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    console.log(this.state.address);
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
        .then(latLng => {fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lng}&units=metric&appid=f04cdca73c381c05cf9dfd807c84353d`)
          .then(response => response.json())
            .then((jsonData) => {

                  this.setState({ display: true,
                      description : jsonData.weather[0].description,
                      temperature : Math.floor(jsonData.main.temp),
                      country : jsonData.sys.country,
                      city : jsonData.name,
                      iconId : jsonData.weather[0].icon
                  }); 
          console.log(this.state)
        }).catch(error => console.error('Error', error))})
      .catch(error => console.error('Error', error));
  };
 
  render() {
   
    return (
      <div class="page">
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        bar
        class = "search_bar"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="meme">
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#D3D3D3', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {this.state.display === true ?<Ui props={this.state}/>:""}
      </div>
    );
  }
}
export default App;
