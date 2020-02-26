import React from 'react';
import $ from 'jquery';
function Ui(obj){
    var iconUrl = "http://openweathermap.org/img/w/" + obj.props.iconId + ".png";
    var _background, _box ;
    let value = "";
    var weather_arr =["cloud", "rain", "clear sky", "thunderstorm","mist"];
    var background_selected = false
                for ( value of weather_arr){
                    var weather = obj.props.description.includes(value);
                    if (weather === true){
                        switch(value) {
                        case "cloud":
                            _background = "https://cdn.theatlantic.com/assets/media/mt/science/cloud-thumb.jpg";
                            _box = "#005580";
                        break;
                        case "thunderstorm":
                            _background = "https://townsquare.media/site/65/files/2019/04/GettyImages-895010376.jpg?w=980&q=75";
                            _box = "#220033"
                        break;
                        case "rain":
                            _background = "https://www.lwdd.net/wp-content/uploads/2018/06/Rain-on-roof.jpg";
                            _box = "#33080"
                        break;
                        default:
                            _background = "https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://soa-inc.com/wp-content/uploads/2017/02/Weather.jpg";
                            _box = "#99ccFF";
                            break;
                        }
                        background_selected = true;
                    }
                    if (background_selected === true){
                        console.log("in if case");
                        break; 
                    }
                }
                if(background_selected === false){
                    _background = "https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://soa-inc.com/wp-content/uploads/2017/02/Weather.jpg";
                    _box = "#99ccFF";
                }
                $("body").css("background-image", "url(" + _background + ")");
                $(".display").css("background", _box);
                    
                    
  
return(
        <div class = "display">
            <h1>{obj.props.city},{obj.props.country}</h1>
            <img class="weather_icon" src={iconUrl} alt=""/>
            <p class="temperature_value">{obj.props.temperature}°<span>C</span></p>
            <p class="status">{obj.props.description}</p>
        </div>
        );
}
export default Ui;