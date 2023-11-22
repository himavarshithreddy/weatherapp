import React , { useState, useEffect,useCallback,useRef }from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './weatherapp.css';
import searchimg from './Assests/search.png'
import humidityimg from './Assests/humidity.png'
import LoadingBar from 'react-top-loading-bar'
import windspeedimg from './Assests/windsock.png'
import uvimg from './Assests/uv.png'
import favimg2 from './Assests/favorite.png'
import drizzle from './Assests/weather/drizzle.png'
import cleard from './Assests/weather/cleard.png'
import clearn from './Assests/weather/clearn.png'
import cloudy from './Assests/weather/cloudy.png'
import fog from './Assests/weather/fog.png'
import hail from './Assests/weather/hail.png'
import heavythunders from './Assests/weather/heavythunders.png'
import mistd from './Assests/weather/mistd.png'
import mistn from './Assests/weather/mistn.png'
import overcast from './Assests/weather/overcast.png'
import pcloudd from './Assests/weather/pcloudd.png'
import pcloudn from './Assests/weather/pcloudyn.png'
import rainy from './Assests/weather/rainy.png'
import sleet from './Assests/weather/sleet.png'
import snowy from './Assests/weather/snowy.png'
import storms from './Assests/weather/storms.png'
import blizzard from './Assests/weather/blizzard.png'


function Weatherapp(){
  const loadingBar = useRef(null);
  const handleToggle = () => {
    loadingBar.current.continuousStart();
    loadingBar.current.complete(); 
    
  };
  let api_key="8a4a55f412704e0cbb381617232110";
  const [wimg,setwimage]=useState(pcloudd);
  const searchfun = useCallback(async (city) => {
    handleToggle();
    let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`;
    let response = await fetch(url);
    let data = await response.json();
    if (data && data.current) {
      
    
      const humidityval = document.getElementById("humidity");
      const windspeedval = document.getElementById("windspeed");
      const uvval = document.getElementById("uv");
      const locationval = document.getElementById("location");
      const tempval = document.getElementById("temp");
      const weathertypeval = document.getElementById("weathertype");
      humidityval.innerHTML = (data.current.humidity).toFixed(1)+"%";
      windspeedval.innerHTML = (data.current.wind_kph).toFixed(1)+" Km/h";
      uvval.innerHTML = data.current.uv;
      locationval.innerHTML = data.location.name;
      tempval.innerHTML = (data.current.temp_c).toFixed(1)+"°C";
      weathertypeval.innerHTML = data.current.condition.text;

      setCity("");

      if(data.current.condition.code===1000 && data.current.is_day===0){
        setwimage(clearn);
      }
      else if(data.current.condition.code===1000 && data.current.is_day===1){
        setwimage(cleard);
      }
      else if(data.current.condition.code===1030 && data.current.is_day===1){
        setwimage(mistd);
      }
      else if(data.current.condition.code===1030 && data.current.is_day===0){
        setwimage(mistn);
      }
      else if(data.current.condition.code===1003 && data.current.is_day===1){
        setwimage(pcloudd);
      }
      else if(data.current.condition.code===1003 && data.current.is_day===0){
        setwimage(pcloudn);
      }

      else if(data.current.condition.code===1000 && data.current.is_day===1){
        setwimage(cleard);
      }
      else if(data.current.condition.code===1006){
        setwimage(cloudy);
      }
      else if(data.current.condition.code===1009){
        setwimage(overcast);
      }
      else if(data.current.condition.code===1063 && data.current.condition.code===1072 && data.current.condition.code===1150 && data.current.condition.code===1153 && data.current.condition.code===1168 && data.current.condition.code===1171 && data.current.condition.code===1180 && data.current.condition.code===1183 && data.current.condition.code===1186 && data.current.condition.code===1189){
        setwimage(drizzle);
      }
      else if(data.current.condition.code===1066 && data.current.condition.code===1114 && data.current.condition.code===1210 && data.current.condition.code===1213 && data.current.condition.code===1216 && data.current.condition.code===1219 && data.current.condition.code===1222 && data.current.condition.code===1225 && data.current.condition.code===1255 && data.current.condition.code===1258){
        setwimage(snowy);
      }
      else if(data.current.condition.code===1069 && data.current.condition.code===1204 && data.current.condition.code===1207 && data.current.condition.code===1249 && data.current.condition.code===1252){
        setwimage(sleet);
      }
      else if(data.current.condition.code===1087 && data.current.condition.code===1273 && data.current.condition.code===1279){
        setwimage(storms);
      }
      else if(data.current.condition.code===1276 && data.current.condition.code===1282){
        setwimage(heavythunders);
      }
      else if(data.current.condition.code===1192 && data.current.condition.code===1195 && data.current.condition.code===1198 && data.current.condition.code===1201 && data.current.condition.code===1240 && data.current.condition.code===1243 && data.current.condition.code===1246){
        setwimage(rainy);
      }
      else if(data.current.condition.code===1237 && data.current.condition.code===1261 && data.current.condition.code===1264){
        setwimage(hail);
      }
      else if(data.current.condition.code===1117){
        setwimage(blizzard);
      }
      else if(data.current.condition.code===1135 && data.current.condition.code===1147){
        setwimage(fog);
      }
      else{
        setwimage(pcloudd);
      }

      

    }
    else{
      toast.error("City not found!", {
        position: "top-right",
        className: 'toast-message'
      });
      setCity("");
    }
   
  },[api_key]);
  useEffect(() => {
  
    const fetchUserLocation = async () => {
      try {
        // Fetch user's IP address
        const response = await fetch('https://api.ipdata.co?api-key=cb980b4d080e774050e182dfea975621bfb35dbdebce8c88ba847baf');
        const data = await response.json();
  
        const ip = data.ip;
        const city = data.city;
        setCity(city);
        console.log(city)
  console.log(ip)
        searchfun(ip);
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }
    };

    fetchUserLocation();
  }, [searchfun]);
  const favsearch = (city) => {
    searchfun(city);
  };
  
    const [favoriteCities, setFavoriteCities] = useState([]);
  const [city, setCity] = useState("");
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCities");
    if (storedFavorites) {
      setFavoriteCities(JSON.parse(storedFavorites));
    }
  }, []);


  const handleFavoriteClick = () => {
    const city2 = document.getElementsByClassName("location1")[0].innerHTML;
    if (city2) {
      if (!favoriteCities.includes(city2)) {
        const updatedFavorites = [...favoriteCities, city2];
        setFavoriteCities(updatedFavorites);
        localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
      }
    }
  };
  const handleRemoveClick = (removedCity) => {
    const updatedFavorites = favoriteCities.filter((city) => city !== removedCity);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      searchfun(city);
    }
  };



return(
    <div className="main">
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="searchbar">
        <input type="text" className="search" placeholder="Search for City" value={city || ""}
          onChange={(e) => setCity(e.target.value)} onKeyPress={handleEnterKey}  />
        <img className="searchimg" src={searchimg} alt="search" onClick={()=>{searchfun(city)}}></img>
        
       </div>
       <div className="maincon">
        <div>
        <div className="cityname">
          <div id="location" className="location1">Location</div>
          <div>
        <img className="favimg2" src={favimg2} alt="fav" onClick={handleFavoriteClick}></img></div>
        </div>
        <div className="ele">
        <div id="temp" className="temp">--C</div>
        <div id="weathertype" className="weathertype"></div>
        </div>
        </div>
        <div className="weatherimage">
            <img className="weatherimg" src={wimg} alt=""></img>
        </div>
       </div>
       <div className="seccon">
       <div className="weatherele">
        <div className="elements">
          <div className="wealabel">
            <img className="weathereleimg" src={humidityimg} alt="humidity"></img>
            <div className="weatherelename">Humidity</div>
          </div>
          <div id="humidity" className="weathereleval">--</div>
        </div>
        <div className="elements">
        <div className="wealabel">
            <img className="weathereleimg" src={windspeedimg} alt="windspeed"></img>
            <div className="weatherelename">Wind Speed</div>
          </div>
          <div id="windspeed" className="weathereleval">--</div>
        </div>
        <div className="elements">
        <div className="wealabel">
            <img className="weathereleimg" src={uvimg} alt="uv"></img>
            <div className="weatherelename">UV</div>
          </div>
          <div id="uv" className="weathereleval">--</div>
        </div>
       </div>
       <div className="fav">
        <div className="favct">Favourite Cities</div>
        <ul className="list">
            {favoriteCities.map((favCity, index) => (
              <li key={index} onClick={() => favsearch(favCity)}>{favCity}
              <div className="rembtn" onClick={() => handleRemoveClick(favCity)}>X</div></li>
            ))}
          </ul>
       </div>
       </div>
       <LoadingBar color='#10ff4880' ref={loadingBar} />
    </div>
)


}
export default Weatherapp;