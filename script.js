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
      document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+name+" landscape')";
      
        fetch("https://pfa.foreca.com/get/api/v1/current/" + id + "&token=" + this.apikey
        ).then((response) => response.json()).then((data) => this.displayWeather(data));
      
      fetch("https://pfa.foreca.com/get/api/v1/forecast/3hourly/" + id + "&token=" + this.apikey
        ).then((response) => response.json()).then((data) => this.hourlyWeather(data));
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
  hourlyWeather:function(data){
    console.log(data);
      let temps=[];
      let times=[];
      let symbols=[];
      for(i=0;i<8;i++){
      const{ time, temperature,symbol}=data.forecast[i];
         console.log(time.slice(11,16),temperature,symbol);
        temps.push(temperature); 
        times.push(time.slice(11,16)); 
        symbols.push(symbol);
      };
      console.log(temps,times);
      document.querySelector(".time1").innerText=times[0];
      document.querySelector(".time2").innerText=times[1];
      document.querySelector(".time3").innerText=times[2];
      document.querySelector(".time4").innerText=times[3];
      document.querySelector(".time5").innerText=times[4];
      document.querySelector(".time6").innerText=times[5];
      document.querySelector(".time7").innerText=times[6];
      document.querySelector(".time8").innerText=times[7];
      
      document.querySelector(".temp1").innerText=temps[0]+"°C";
      document.querySelector(".temp2").innerText=temps[1]+"°C";
      document.querySelector(".temp3").innerText=temps[2]+"°C";
      document.querySelector(".temp4").innerText=temps[3]+"°C";
      document.querySelector(".temp5").innerText=temps[4]+"°C";
      document.querySelector(".temp6").innerText=temps[5]+"°C";
      document.querySelector(".temp7").innerText=temps[6]+"°C";
      document.querySelector(".temp8").innerText=temps[7]+"°C";
      
      document.querySelector(".icon1").src="https://developer.foreca.com/static/images/symbols/"+symbols[0]+".png";
      document.querySelector(".icon2").src="https://developer.foreca.com/static/images/symbols/"+symbols[1]+".png";
      document.querySelector(".icon3").src="https://developer.foreca.com/static/images/symbols/"+symbols[2]+".png";
      document.querySelector(".icon4").src="https://developer.foreca.com/static/images/symbols/"+symbols[3]+".png";
      document.querySelector(".icon5").src="https://developer.foreca.com/static/images/symbols/"+symbols[4]+".png";
      document.querySelector(".icon6").src="https://developer.foreca.com/static/images/symbols/"+symbols[5]+".png";
      document.querySelector(".icon7").src="https://developer.foreca.com/static/images/symbols/"+symbols[6]+".png";
      document.querySelector(".icon8").src="https://developer.foreca.com/static/images/symbols/"+symbols[7]+".png";
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
