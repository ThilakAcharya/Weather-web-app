let weather = {
    apikey: /*api key goes here*/
    fetchWeather: function (city) {
        fetch("https://pfa.foreca.com/get/api/v1/location/search/" + city + "&token=" + this.apikey
        ).then((response) => response.json()).then((data) => this.displayCity(data));
        

    },
    displayCity: function (data) {
        

        const { name, id } = data.locations[0];
        console.log(name, id);
      document.querySelector(".city").innerText = name;
      
        fetch("https://pfa.foreca.com/get/api/v1/current/" + id + "&token=" + this.apikey
        ).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        console.log(data)
        const { symbol, temperature, symbolPhrase, feelsLikeTemp, relHumidity, visibility } = data.current;
        const { time,windSpeed, windDirString, pressure } = data.current;
        console.log(time.slice(0,10).split("-").reverse().join("-"),time.slice(11,16),symbol, temperature, symbolPhrase, feelsLikeTemp);
      
      document.querySelector(".icon").src="https://developer.foreca.com/static/images/symbols/"+symbol+".png";
      document.querySelector(".description").innerText=symbolPhrase;      document.querySelector(".temperature").innerText=temperature+"°|";
      document.querySelector(".feelsLikeTemp").innerText = "Feels Like "+feelsLikeTemp+"°c";
      document.querySelector(".time").innerText=time.slice(11,16);
      document.querySelector(".date").innerText=time.slice(0,10).split("-").reverse().join("-");
      document.querySelector(".wind-speed").innerText="Wind Speed "+windSpeed+"km/hr";
      document.querySelector(".wind-dir").innerText="Wind Direction "+windDirString;
      document.querySelector(".humidity").innerText="Humidity "+relHumidity+"%";
      document.querySelector(".visbility").innerText="Visbility "+visibility+"m";
        
    },
  search:function(){
    this.fetchWeather(document.querySelector(".search").value)
  }
}
function click_function(){
  weather.search();
};
const input = document.querySelector(".search");
input.addEventListener("keypress",function(event){
  if (event.key =="Enter"){
    event.preventDefault();
    click_function();
  }
});
